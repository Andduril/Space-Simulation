export default function getTimeFormat(time: number): string {
  const seconds = time % 60;
  const minutes = Math.floor((time / 60) % 60);
  const hours = Math.floor((time / 3600) % 24);
  const days = Math.floor((time / 86400) % 30.436875);
  const months = Math.floor((time / 2592000) % 12);
  const years = Math.floor(time / 31536000);

  return "T+" + years + "y " + months + "m " + days + "d " + hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
}