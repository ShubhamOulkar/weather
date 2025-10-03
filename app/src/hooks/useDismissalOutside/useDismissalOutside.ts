import { useState, useRef, useEffect, useCallback, type RefCallback, type RefObject } from "react";

type OutsidePointerDownEvent = CustomEvent<{ originalEvent: PointerEvent }>
type OutsideFocusEvent = CustomEvent<{ originalEvent: FocusEvent }>

interface UseDismissalOutsideOptions {
    onPointerDownOutsideEvent?: (event: OutsidePointerDownEvent) => void;
    onFocusOutsideEvent?: (event: OutsideFocusEvent) => void;
    onDismissalEvent?: () => void;
}

/**
 * **nodeRef:** This ref should be attached to the element that you want to dismiss
 *  (e.g., the dropdown menu itself). The hook considers any interaction inside 
 *  this element as "safe," so it won't trigger a dismissal.
 * 
 * **userRef:** This ref is attached to the element that toggles the dismissible 
 *  component (e.g., the button that opens the dropdown). Since this trigger 
 *  element is often outside the dropdown menu, the hook needs to know about 
 *  it to prevent it from immediately closing the menu you just opened.
 * 
 * **onDismissalEvent:** This is the callback function that gets executed when 
 *  a click or focus event happens outside both the nodeRef and userRef elements. 
 *  Typically, you'll use it to set the state that hides your component 
 *  (e.g., setOpen(false)).
 * @param UseDismissalOutsideOptions
 * @returns NodeRef, UserRef 
 */

export function useDismissalOutside<
    NodeRef extends HTMLElement,
    UserRef extends HTMLElement
>({
    onPointerDownOutsideEvent,
    onFocusOutsideEvent,
    onDismissalEvent,
}: UseDismissalOutsideOptions): {
    nodeRef: RefCallback<NodeRef>,
    userRef: RefObject<UserRef | null>
} {
    const [node, setNode] = useState<NodeRef | null>(null)
    const ownerDocument = node?.ownerDocument ?? globalThis.document
    const nodeRef = useCallback<RefCallback<NodeRef>>((el) => setNode(el), [])
    /*
        This refrence to current pointer element, if this element is
        already having pointer down event then disable focus in event.
        Some elements can fire both events by default like buttons and input.
        So we are disabling focuin event if user is interacted with pointer.
        This is little optimization that most of the libraries dont do that.
     */
    const pointerDownEle = useRef<Node | null>(null)
    /*
        user ref is UI point where actually interact with components 
        like buttons search input. This ref is used to disable 
        pointerdown and focusin events on those elements. Beacause 
        these elements are outside of target node element but we dont 
        want to close dropdown. We recommend to write own open/close dropdown
        on specific user intraction.
    */
    const userRef = useRef<UserRef | null>(null);

    // Using a ref for callbacks to prevent unnecessary effect re-runs
    const callbacksRef = useRef({ onPointerDownOutsideEvent, onFocusOutsideEvent, onDismissalEvent });
    useEffect(() => {
        callbacksRef.current = { onPointerDownOutsideEvent, onFocusOutsideEvent, onDismissalEvent };
    });

    // pointer down
    useEffect(() => {
        if (!node) return

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node
            // set current poiter down element. We should stop focusin event on this element
            pointerDownEle.current = target
            // if current target within owner document then return also return on user target
            // because we want user target events handled in component itself
            if (node.contains(target) || userRef.current?.contains(target)) return

            // if target is outside of the element
            const customEvent: OutsidePointerDownEvent = new CustomEvent("pointerDownOutside", {
                bubbles: false,
                cancelable: true,
                detail: { originalEvent: event },
            })

            const dispatch = () => {
                callbacksRef.current.onPointerDownOutsideEvent?.(customEvent);
                if (!customEvent.defaultPrevented) {
                    callbacksRef.current.onDismissalEvent?.();
                }
            };

            dispatch();
        }

        ownerDocument.addEventListener('pointerdown', handlePointerDown);

        return () => {
            ownerDocument.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [node, ownerDocument])

    // focus in
    useEffect(() => {
        if (!node) return

        const handleFocus = (event: FocusEvent) => {
            const target = event.target as Node
            // if current target also has focus event then return
            // TODO: Implement test for element which fires both events 
            // on pointer down interation and also get focused.
            if (target === pointerDownEle.current) return

            if (node.contains(target) || userRef.current?.contains(target)) return

            const customEvent = new CustomEvent("focusOutside", {
                bubbles: false,
                cancelable: true,
                detail: { originalEvent: event }
            }) as OutsideFocusEvent

            callbacksRef.current.onFocusOutsideEvent?.(customEvent)
            if (!customEvent.defaultPrevented) callbacksRef.current.onDismissalEvent?.()
        }

        ownerDocument.addEventListener("focusin", handleFocus)
        return () => {
            ownerDocument.removeEventListener("focusin", handleFocus)
        }
    }, [node, ownerDocument])

    return { nodeRef, userRef }
}