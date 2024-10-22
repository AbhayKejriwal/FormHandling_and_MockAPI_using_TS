// This file contains the code to handle form submission and validation

// This code is executed when the DOM has loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get the form element
    const form = document.getElementById("contact-us-form") as HTMLFormElement;

    // Add a submit event listener to the form
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get the form data and validate it
        const formData = getFormData();
        const errors = validateFormData(formData);

        // If there are errors, display them and return
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        // Submit the form if there are no errors
        await submitForm(form, formData);
    });
});

// Define the form data interface
interface MyFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

// Function to get form data from the input elements
function getFormData(): MyFormData {
    const form: MyFormData = {
        name: (document.getElementById("name") as HTMLInputElement).value.trim(),
        email: (document.getElementById("email") as HTMLInputElement).value.trim(),
        phone: (document.getElementById("phone") as HTMLInputElement).value.trim(),
        subject: (document.getElementById("subject") as HTMLInputElement).value.trim(),
        message: (document.getElementById("message") as HTMLTextAreaElement).value.trim(),
    };

    return form;
}

// Function to validate the form data and return an array of error messages
function validateFormData(data: MyFormData): string[] {
    const errors: string[] = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    const phoneRegex = /^\d{10}$/; // 10-digit phone number regex

    if (!data.name) errors.push("Name is required.");
    if (!data.email || !emailRegex.test(data.email)) errors.push("Please enter a valid email address.");
    if (!data.phone || !phoneRegex.test(data.phone)) errors.push("Phone number must be a 10-digit number.");
    if (!data.subject) errors.push("Subject is required.");
    if (!data.message) errors.push("Message cannot be empty.");

    return errors;
}

// Function to submit the form data to the server
async function submitForm(form: HTMLFormElement, data: MyFormData): Promise<void> {

    try {
        // Send a POST request to the server with the form data
        const response = await fetch("https://67176745b910c6a6e027f2f6.mockapi.io/contactform", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Check if the request was successful and show an alert message
        if (response.ok) {
            alert("Form submitted successfully!");
            form.reset();
        } else {
            // If the request was not successful, show an error message
            alert("Failed to submit form. Please try again.");
        }
    } catch (error) {
        // If an error occurred during the request, log it to the console and show
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form.");
    }
}