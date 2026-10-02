document.documentElement.classList.add('js-enabled');

const criteria = {
  advance: {
    id: 'CR-001',
    title: 'Cancel more than 24h before',
    status: 'Passed',
    source: 'cancellation.test.js:18',
    expected: 'cancelled',
    received: 'cancelled',
    note: 'Sample check: a reservation 48 hours away can be cancelled.',
  },
  boundary: {
    id: 'CR-002',
    title: 'Cancel exactly 24h before',
    status: 'Unverified',
    source: 'No executed check linked to this scenario',
    expected: 'cancelled',
    received: 'not checked',
    note: 'The exact 24-hour boundary still needs its own check.',
  },
  late: {
    id: 'CR-003',
    title: 'Reject cancellation within 24h',
    status: 'Failed',
    source: 'cancellation.test.js:42',
    expected: 'rejected',
    received: 'accepted',
    note: 'Sample check: a reservation 12 hours away can still be cancelled.',
  },
  release: {
    id: 'CR-004',
    title: 'Release the reserved spot',
    status: 'Passed',
    source: 'cancellation.test.js:61',
    expected: 'available',
    received: 'available',
    note: 'Sample check: the spot becomes available after a valid cancellation.',
  },
};

let corrected = false;
let selected = 'late';
const rows = [...document.querySelectorAll('[data-criterion]')];
const report = document.querySelector('.report-card');
const correctionButton = document.querySelector('#preview-correction');
const announcement = document.querySelector('#demo-announcement');

function getCriterion(key) {
  if (key === 'late' && corrected) {
    return {
      ...criteria.late,
      status: 'Passed',
      received: 'rejected',
      note: 'Correction preview: the 12-hour cancellation is rejected. The boundary case remains unverified.',
    };
  }
  return criteria[key];
}

function renderEvidence() {
  const criterion = getCriterion(selected);
  rows.forEach((row) => {
    const active = row.dataset.criterion === selected;
    row.setAttribute('aria-pressed', String(active));
    row.classList.toggle('selected', active);
  });
  document.querySelector('#evidence-title').textContent = `${criterion.id} / SAMPLE EVIDENCE`;
  document.querySelector('#evidence-path').textContent = criterion.source;
  document.querySelector('#evidence-note').textContent = criterion.note;
  const result = document.querySelector('#evidence-result');
  result.replaceChildren();
  for (const [label, value] of [['Expected', criterion.expected], ['Received', criterion.received]]) {
    const span = document.createElement('span');
    span.append(`${label} `);
    const code = document.createElement('code');
    code.textContent = value;
    if (label === 'Received' && criterion.status === 'Failed') code.className = 'failure-code';
    span.append(code);
    result.append(span);
  }
}

rows.forEach((row) => {
  row.disabled = false;
  row.addEventListener('click', () => {
    selected = row.dataset.criterion;
    renderEvidence();
    const criterion = getCriterion(selected);
    announcement.textContent = `${criterion.id}: ${criterion.title}. ${criterion.status}. ${criterion.note}`;
  });
});

correctionButton.addEventListener('click', () => {
  corrected = !corrected;
  selected = 'late';
  report.classList.toggle('is-corrected', corrected);
  document.querySelector('#passed-count').textContent = corrected ? '3' : '2';
  const label = document.querySelector('#summary-label');
  label.textContent = corrected ? '1 check still needed' : 'Needs attention';
  label.classList.toggle('corrected', corrected);
  document.querySelector('#failure-segment').className = `progress-segment ${corrected ? 'passed' : 'failed'}`;
  document.querySelector('#late-icon').className = `result-icon ${corrected ? 'passed' : 'failed'}`;
  document.querySelector('#late-icon use').setAttribute('href', corrected ? '#i-check' : '#i-cross');
  const lateResult = document.querySelector('#late-result');
  lateResult.textContent = corrected ? 'Passed' : 'Failed';
  lateResult.className = `result-label ${corrected ? 'passed' : 'failed'}`;
  correctionButton.firstChild.textContent = corrected ? 'Reset the sample ' : 'Preview a correction ';
  announcement.textContent = corrected
    ? 'Correction preview: three criteria passed. The exact 24-hour boundary remains unverified. These are illustrative results.'
    : 'Sample reset: two criteria passed, one failed, and one remains unverified.';
  renderEvidence();
});

document.querySelector('#download-report').addEventListener('click', () => {
  const content = [
    '# SDDFW — Sample acceptance report',
    '',
    '> Illustrative sample only. No application tests were executed by this landing.',
    '',
    `Preview state: ${corrected ? 'after correction' : 'before correction'}.`,
    '',
    '## Requested behavior',
    '',
    'Allow cancellations at least 24 hours before a reservation.',
    '',
    '## Sample criteria',
    '',
    ...Object.keys(criteria).flatMap((key) => {
      const criterion = getCriterion(key);
      return [
        `### ${criterion.id} — ${criterion.title}`,
        '',
        `- Result: ${criterion.status}`,
        '- Environment: illustrative local sample',
        `- Sample source: ${criterion.source}`,
        `- Expected: ${criterion.expected}`,
        `- Received: ${criterion.received}`,
        `- Note: ${criterion.note}`,
        '',
      ];
    }),
    '## Next step',
    '',
    corrected
      ? 'Add and execute a check for the exact 24-hour boundary.'
      : 'Reject cancellations within 24 hours, then add and execute a boundary check.',
    '',
  ].join('\n');
  const url = URL.createObjectURL(new Blob([content], { type: 'text/markdown;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sddfw-sample-report.md';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  announcement.textContent = 'The illustrative sample report has been downloaded as Markdown.';
});

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.mobile-toggle');
const nav = document.querySelector('#navigation');

function setMenu(open, restoreFocus = false) {
  header.dataset.menuOpen = String(open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => setMenu(header.dataset.menuOpen !== 'true'));
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.dataset.menuOpen === 'true') setMenu(false, true);
});
document.addEventListener('click', (event) => {
  if (header.dataset.menuOpen === 'true' && !header.contains(event.target)) setMenu(false);
});
window.matchMedia('(min-width: 601px)').addEventListener('change', () => setMenu(false));

renderEvidence();
