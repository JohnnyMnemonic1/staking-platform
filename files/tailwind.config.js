/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-green-900/20', 'border-green-500', 'text-green-500', 'bg-green-500', 'bg-green-900/40',
    'bg-blue-900/20', 'border-blue-500', 'text-blue-500', 'bg-blue-500', 'bg-blue-900/40',
    'bg-purple-900/20', 'border-purple-500', 'text-purple-500', 'bg-purple-500', 'bg-purple-900/40',
    'bg-green-800', 'bg-blue-800', 'bg-purple-800',
    'bg-green-900/20', 'bg-blue-900/20', 'bg-purple-900/20',
    'border-green-800', 'border-blue-800', 'border-purple-800'
  ]
}