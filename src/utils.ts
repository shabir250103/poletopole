/**
 * Format markdown-like string into simple JSX or HTML safely.
 */
export function parseMarkdownToHTML(text: string): string {
  if (!text) return '';
  
  // Escape HTML characters to prevent XSS
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold text: **test**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-400 font-semibold">$1</strong>');
  
  // Single asterisks for emphasis / italic: *test*
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-300">$1</em>');

  // Bullet items: line starting with - or *
  const lines = html.split('\n');
  let inList = false;
  const processedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const content = trimmed.substring(2);
      let res = '';
      if (!inList) {
        res += '<ul class="list-disc pl-5 my-2 space-y-1 text-gray-300">';
        inList = true;
      }
      res += `<li>${content}</li>`;
      return res;
    } else {
      let res = '';
      if (inList) {
        res += '</ul>';
        inList = false;
      }
      if (trimmed === '') {
        return '<div class="h-2"></div>';
      }
      return `<p class="my-1.5 leading-relaxed text-gray-200">${line}</p>`;
    }
  });

  if (inList) {
    processedLines.push('</ul>');
  }

  return processedLines.join('');
}

/**
 * Format currency in INR beautifully.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Common class merger utility
 */
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}
