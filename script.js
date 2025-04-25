document.addEventListener('DOMContentLoaded', function() {

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Skill Bar Animation ---
    const skillsSection = document.querySelector('#skills');
    const skillLevels = document.querySelectorAll('#skills .level');

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('skill-animate');
                skillLevels.forEach(level => {
                    // Set the target width as a CSS variable
                    level.style.setProperty('--skill-level', level.style.width);
                    // Trigger animation by applying the class
                    level.closest('.skill').classList.add('skill-animate');
                });
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.3 }); // Trigger when 30% visible

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    } else {
        console.error("Skills section not found");
    }

    // --- Interactive Experience Timeline ---

    // Experience Data (Extracted from CV)
    const experiences = [
        {
            company: "Datanimbus, INC",
            location: "Plano, TX, USA",
            title: "Business Development Analyst",
            dates: "Apr 2024 – Nov 2024",
            details: [
                "Supported business development and sales teams by assisting account executives, writing database queries, and building insightful tools for data-driven decision making.",
                "Led qualitative and quantitative analysis on the Datanimbus Finhub platform, empowering Financial Institutions with data and AI-driven advancements for new revenue streams, operational efficiency, and risk mitigation.",
                "Developed and maintained automated reports utilizing SQL and Python, providing actionable insights to internal business stakeholders and external partners."
            ] // [cite: 6, 7, 8]
        },
        {
            company: "University of Connecticut, Stamford",
            location: "Stamford, CT, USA",
            title: "Math Tutor",
            dates: "Sept 2023 - Dec 2023",
            details: [
                "Conducted personalized tutoring sessions for students at the University of Connecticut, Stamford, specializing in a comprehensive range of mathematical disciplines, including Algebra, Geometry, and Advanced Trigonometry, successfully clarifying concepts and solving queries to enhance academic performance.",
                "Awarded 'Tutor of the Month' for September '23."
            ] // [cite: 9, 10]
        },
        {
            company: "Citicorp Services India Pvt. Ltd (Citi Group)",
            location: "Mumbai, India",
            title: "Credit Analyst",
            dates: "Jan 2021 - Jan 2022",
            details: [
                "Worked in the Independent Risk Assessment Unit (IRAU) of the bank.",
                "Performed fundamental credit analysis and communicated key findings in yearly and quarterly credit memos to various stakeholders for Banks, NBCF's and other financial institutions for India, Sri Lanka, and Bangladesh region.",
                "Conducted presentations on quarterly results of the portfolio companies to multiple teams, including Risk and Banking seniors."
             ] // [cite: 11, 12, 13]
        },
         {
            company: "Morningstar India Financial Services",
            location: "Mumbai, India",
            title: "Research Associate",
            dates: "Sept 2019 - March 2020",
            details: [
                "Worked under the Pitchbook team, which provides financial data on VC, PE, and M&A space covering the global market.",
                "Collated key data points on private companies in Venture Capital and Early-Stage space primarily in the NA (North America) region.",
                "Showcased the private market ecosystem, including various types of funding, key deals, management, business model for various start-ups and early-stage companies on the platform."
             ] // [cite: 14, 15, 16]
        },
         {
            company: "N C Chhajed & Associates Chartered Accountants",
            location: "Mumbai, India",
            title: "Audit Assistant",
            dates: "Jan 2016 - Jan 2019",
            details: [
                "Performed audit procedures on specific financial line items under the supervision of senior team members with the objective of ensuring that the financial statements are prepared, in all material aspects, in accordance with the applicable financial reporting framework.",
                "Carried internal audit of the company's books of accounts and finalization of books & financial statements.",
                "Assisted with tax audits and tax returns."
            ] // [cite: 17, 18, 19]
        }
        // Add other experiences similarly
    ];

    const timelineElement = document.querySelector('#experience .timeline');
    const detailsElement = document.getElementById('experience-details');
    const prevButton = document.getElementById('prev-exp');
    const nextButton = document.getElementById('next-exp');
    let currentExperienceIndex = 0;

    function displayExperienceDetails(index) {
        if (index < 0 || index >= experiences.length) return; // Boundary check

        const exp = experiences[index];
        let detailsHTML = `<h3>${exp.title} at ${exp.company}</h3>`;
        detailsHTML += `<p><i>${exp.location} | ${exp.dates}</i></p>`;
        detailsHTML += '<ul>';
        exp.details.forEach(detail => {
            detailsHTML += `<li>${detail}</li>`;
        });
        detailsHTML += '</ul>';
        detailsElement.innerHTML = detailsHTML;

        // Update active state on timeline items
         const timelineItems = timelineElement.querySelectorAll('.timeline-item');
         timelineItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                // Optional: Scroll the active item into view if the timeline overflows
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                item.classList.remove('active');
            }
        });
    }

    function populateTimeline() {
        if (!timelineElement) return; // Ensure timeline element exists
        timelineElement.innerHTML = ''; // Clear existing items
        experiences.forEach((exp, index) => {
            const item = document.createElement('div');
            item.classList.add('timeline-item');
            item.dataset.index = index; // Store index for easy access
            item.innerHTML = `<h4>${exp.company}</h4><p>${exp.title}</p><p><i>${exp.dates.split('–')[0].trim()}</i></p>`; // Show company, title, and start year

            item.addEventListener('click', () => {
                currentExperienceIndex = index;
                displayExperienceDetails(currentExperienceIndex);
            });

            timelineElement.appendChild(item);
        });

         // Display initial details
        if (experiences.length > 0) {
            displayExperienceDetails(currentExperienceIndex);
        } else {
             detailsElement.innerHTML = '<p>No experience details to display.</p>';
        }
    }

    // Navigation Button Logic
     if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            if (currentExperienceIndex > 0) {
                currentExperienceIndex--;
                displayExperienceDetails(currentExperienceIndex);
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentExperienceIndex < experiences.length - 1) {
                currentExperienceIndex++;
                displayExperienceDetails(currentExperienceIndex);
            }
        });
    }

    // Initialize timeline
    populateTimeline();

});
