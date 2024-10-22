document.getElementById('gender').addEventListener('change', function(event) {
    const gender = event.target.value;
    
    // Change background color based on gender
    if (gender === 'male') {
        document.body.style.backgroundColor = '#ADD8E6';  // Light blue color for male
    } else if (gender === 'female') {
        document.body.style.backgroundColor = '#FFC0CB';  // Pink color for female
    } else {
        document.body.style.backgroundColor = '#f4f4f4';  // Default background color
    }
});

document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const gender = document.getElementById('gender').value;
    const heightFeet = parseInt(document.getElementById('heightFeet').value);
    const heightInches = parseInt(document.getElementById('heightInches').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const wristSize = parseFloat(document.getElementById('wristSize').value);

    // Convert height to inches
    const totalHeightInches = (heightFeet * 12) + heightInches;
    
    // Convert height to meters for BMI calculation
    const heightInMeters = totalHeightInches * 0.0254;

    if (weight > 0 && heightInMeters > 0) {
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        let category = '';
        let advice = '';
        let boneStructure = '';

        // Determine bone structure based on gender, height, and wrist size
        if (gender === 'female') {
            if (totalHeightInches < 62) { // Under 5'2"
                if (wristSize < 5.5) {
                    boneStructure = 'Small-boned';
                } else if (wristSize <= 5.75) {
                    boneStructure = 'Medium-boned';
                } else {
                    boneStructure = 'Large-boned';
                }
            } else if (totalHeightInches >= 62 && totalHeightInches <= 65) { // Between 5'2" and 5'5"
                if (wristSize < 6) {
                    boneStructure = 'Small-boned';
                } else if (wristSize <= 6.25) {
                    boneStructure = 'Medium-boned';
                } else {
                    boneStructure = 'Large-boned';
                }
            } else { // Over 5'5"
                if (wristSize < 6.25) {
                    boneStructure = 'Small-boned';
                } else if (wristSize <= 6.5) {
                    boneStructure = 'Medium-boned';
                } else {
                    boneStructure = 'Large-boned';
                }
            }
        } else { // Male
            if (totalHeightInches > 65) { // Over 5'5"
                if (wristSize < 5.5) {
                    boneStructure = 'Small-boned';
                } else if (wristSize <= 6.5) {
                    boneStructure = 'Medium-boned';
                } else {
                    boneStructure = 'Large-boned';
                }
            }
        }

        // Determine BMI category
        if (bmi < 18.5) {
            category = 'Underweight';
            advice = `
                <h2>Advice for Underweight</h2>
                <ul>
                    <li>Eat nutrient-dense foods like nuts, seeds, and avocados.</li>
                    <li>Have frequent meals throughout the day.</li>
                    <li>Incorporate healthy snacks like protein bars and smoothies.</li>
                    <li>Engage in strength training to build muscle mass.</li>
                    <li>Consult a healthcare provider or registered dietitian for personalized advice.</li>
                </ul>
            `;
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal weight';
            advice = `
                <h2>Advice for Maintaining Healthy Weight</h2>
                <p>Continue with a balanced diet and regular physical activity to maintain your weight.</p>
            `;
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
            advice = `
                <h2>Advice for Overweight</h2>
                <ul>
                    <li>Focus on a balanced diet rich in fruits, vegetables, and whole grains.</li>
                    <li>Practice portion control and mindfulness about eating.</li>
                    <li>Incorporate regular physical activity, aiming for at least 150 minutes a week.</li>
                    <li>Set realistic weight loss goals of 0.5 to 1 kg per week.</li>
                    <li>Consider joining support groups or working with a healthcare provider.</li>
                </ul>
            `;
        } else {
            category = 'Obesity';
            advice = `
                <h2>Advice for Obesity</h2>
                <ul>
                    <li>Seek professional help for personalized weight management strategies.</li>
                    <li>Focus on a sustainable, healthy lifestyle rather than quick fixes.</li>
                    <li>Engage in physical activity and make gradual dietary changes.</li>
                </ul>
            `;
        }

        document.getElementById('result').innerHTML = `Your BMI is ${bmi}. Category: ${category}. Bone Structure: ${boneStructure}`;
        document.getElementById('advice').innerHTML = advice;
    } else {
        document.getElementById('result').innerText = 'Please enter valid weight and height!';
        document.getElementById('advice').innerHTML = '';
    }
});
