export const getColorFromName = name => {
  const colors = [
    '#F44336', // Red
    '#E91E63', // Pink
    '#9C27B0', // Purple
    '#3F51B5', // Indigo
    '#03A9F4', // Light Blue
    '#009688', // Teal
    '#4CAF50', // Green
    '#FF9800', // Orange
    '#795548', // Brown
    '#607D8B', // Blue Grey
  ];

  const charCode = name.charCodeAt(0) || 0; // first character's char code
  const colorIndex = charCode % colors.length;
  return colors[colorIndex];
};
