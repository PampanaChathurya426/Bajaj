document.getElementById('jsonForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const dropdownContainer = document.getElementById('dropdownContainer');
    const responseContainer = document.getElementById('responseContainer');

    // Reset previous error and response
    errorElement.textContent = '';
    responseContainer.innerHTML = '';

    // Validate JSON
    let parsedData;
    try {
        parsedData = JSON.parse(jsonInput);
    } catch (error) {
        errorElement.textContent = 'Invalid JSON format';
        return;
    }

    // Display the dropdown
    dropdownContainer.classList.remove('hidden');

    // Mock API response for demonstration
    const mockResponse = {
        alphabets: parsedData.data.filter(item => /^[A-Za-z]+$/.test(item)).join(', '),
        numbers: parsedData.data.filter(item => /^[0-9]+$/.test(item)).join(', '),
        highest_lowercase: parsedData.data.filter(item => /^[a-z]+$/.test(item)).sort().pop() || 'None'
    };

    // Simulate network delay
    setTimeout(() => {
        handleResponse(mockResponse);
    }, 500); // Simulate a 500ms delay

    function handleResponse(data) {
        // Handle dropdown change event
        document.getElementById('multiSelect').addEventListener('change', function () {
            const selectedOptions = Array.from(this.selectedOptions).map(option => option.value);
            let resultHTML = '';

            if (selectedOptions.includes('alphabets')) {
                resultHTML += `<div>Alphabets: ${data.alphabets || 'No data'}</div>`;
            }
            if (selectedOptions.includes('numbers')) {
                resultHTML += `<div>Numbers: ${data.numbers || 'No data'}</div>`;
            }
            if (selectedOptions.includes('highest_lowercase')) {
                resultHTML += `<div>Highest Lowercase Alphabet: ${data.highest_lowercase || 'No data'}</div>`;
            }

            responseContainer.innerHTML = resultHTML;
        });
    }
});
