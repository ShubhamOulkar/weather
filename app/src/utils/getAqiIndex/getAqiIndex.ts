export default function getAqiIndex(aqi: string | number | undefined) {
  if (!aqi) return null;

  const value = Math.round(Number(aqi));
  let label = "";

  if (value >= 0 && value <= 50) {
    label = "Good";
  } else if (value <= 100) {
    label = "Moderate";
  } else if (value <= 150) {
    label = "Bad";
  } else if (value <= 200) {
    label = "Unhealthy";
  } else if (value <= 300) {
    label = "Danger";
  } else {
    label = "Hazardous";
  }

  return { label, value };
}
