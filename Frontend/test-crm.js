// Using native fetch

async function testContact() {
    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "Test User",
                email: "test@example.com",
                phone: "1234567890",
                message: "Testing CRM Integration",
                service: "Test Service",
                university: "Test Uni",
                jobTitle: "Test Job",
                sourcePage: "Terminal Test Script"
            })
        });
        const dataText = await response.text();
        try {
            const data = JSON.parse(dataText);
            console.log("POST /api/contact:", data);
        } catch (e) {
            console.log("POST /api/contact non-JSON:", dataText.substring(0, 500));
        }

        const leadsResponse = await fetch('http://localhost:3000/api/leads');
        const leadsDataText = await leadsResponse.text();
        try {
            const leadsData = JSON.parse(leadsDataText);
            console.log("GET /api/leads:", leadsData.data?.length || leadsData.length, "leads found");
            if (leadsData.data && leadsData.data.length > 0) {
                console.log("Latest lead:", leadsData.data[0]);
            } else if (leadsData.length > 0) {
                console.log("Latest lead:", leadsData[0]);
            }
        } catch (e) {
            console.log("GET /api/leads non-JSON:", leadsDataText.substring(0, 500));
        }

    } catch (e) {
        console.error("Test failed:", e);
    }
}

testContact();
