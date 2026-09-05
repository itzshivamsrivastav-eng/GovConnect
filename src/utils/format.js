export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatCurrency(amount) {
  if (amount === undefined || amount === null || amount === '') return '—';
  const num = Number(amount);
  if (Number.isNaN(num)) return amount;
  return `₹${num.toLocaleString('en-IN')}`;
}

export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const then = new Date(dateStr).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - then);
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
}

export function calcAge(dobStr) {
  if (!dobStr) return null;
  const dob = new Date(dobStr);
  if (Number.isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

export function calcProfileCompletion(profile) {
  if (!profile) return 0;
  const fields = [
    'fullName', 'fatherName', 'motherName', 'dob', 'gender', 'mobile', 'email',
    'address', 'state', 'district', 'city', 'pincode',
    'educationLevel', 'institutionName', 'course', 'studentStatus',
    'occupation', 'employmentType',
    'annualIncome', 'incomeCategory',
    'category', 'maritalStatus',
  ];
  const filled = fields.filter((f) => {
    const v = profile[f];
    return v !== undefined && v !== null && String(v).trim() !== '';
  });
  return Math.round((filled.length / fields.length) * 100);
}
