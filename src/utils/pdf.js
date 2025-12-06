export function printPDF(title = "Silent Directory Document") {
  const originalTitle = document.title;
  document.title = title;

  // Small delay ensures styles are fully applied
  setTimeout(() => {
    window.print();
    document.title = originalTitle;
  }, 200);
}
