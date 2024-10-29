async function generateDietPlan() {
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;

  if (!age || !weight || !height) {
    alert("Please fill in all required fields.");
    return;
  }

  // Send data to the backend
  const response = await fetch('http://127.0.0.1:5000/get_diet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      age: parseInt(age),
      weight: parseFloat(weight),
      height: parseFloat(height),
    }),
  });

  const result = await response.json();

  // Display the result in the frontend
  const plan = `
    <ul>
      <li><strong>Calories:</strong> ${result.recommended_calories.toFixed(2)} kcal</li>
      <li><strong>Protein:</strong> ${result.recommended_protein.toFixed(2)} g</li>
      <li><strong>Carbohydrates:</strong> ${result.recommended_carbs.toFixed(2)} g</li>
      <li><strong>Fat:</strong> ${result.recommended_fat.toFixed(2)} g</li>
    </ul>
  `;

  document.getElementById('plan-details').innerHTML = plan;
}
