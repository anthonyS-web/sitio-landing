export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': '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'
    },
    body: JSON.stringify({ email, listIds: [2], updateEnabled: true })
  });

  const status = response.ok || response.status === 204 ? 200 : 500;
  res.status(status).json({ ok: status === 200 });
}
