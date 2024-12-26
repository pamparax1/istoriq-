document.addEventListener('DOMContentLoaded', () => {
    // Royal Library 3D Scene
    function createRoyalLibraryScene() {
        const container = document.getElementById('royal-library-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        
        renderer.setSize(container.clientWidth, 400);
        container.appendChild(renderer.domElement);

        // Create a stylized library scene
        const geometry = new THREE.BoxGeometry(5, 3, 3);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xD4AF37,  // Golden color
            metalness: 0.5,
            roughness: 0.3
        });
        const library = new THREE.Mesh(geometry, material);
        scene.add(library);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 7;

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            library.rotation.y += 0.005;
            renderer.render(scene, camera);
        }
        animate();

        // Responsive
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / 400;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, 400);
        });
    }

    // Interactive Timeline
    function createTimeline() {
        const timelineContainer = document.getElementById('timeline-container');
        const events = [
            { year: 893, event: 'Tsar Simeon becomes ruler' },
            { year: 904, event: 'Expansion into Byzantine territories' },
            { year: 917, event: 'Battle of Anchialos - Major Victory' },
            { year: 924, event: 'Siege of Constantinople' },
            { year: 927, event: 'Peak of Bulgarian Empire' }
        ];

        const timeline = document.createElement('div');
        timeline.className = 'timeline';

        events.forEach(eventData => {
            const eventElement = document.createElement('div');
            eventElement.className = 'timeline-event';
            eventElement.innerHTML = `
                <div class="timeline-year">${eventData.year}</div>
                <div class="timeline-description">${eventData.event}</div>
            `;
            timeline.appendChild(eventElement);
        });

        timelineContainer.appendChild(timeline);
    }

    // Quiz Functionality
    function createQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        const quizQuestions = [
            {
                question: "Who was Tsar Simeon the Great?",
                options: [
                    "A Byzantine Emperor",
                    "A Bulgarian Ruler who expanded the First Bulgarian Empire",
                    "A Roman General",
                    "A Slavic Priest"
                ],
                correctAnswer: 1
            },
            {
                question: "In what year did the Battle of Anchialos take place?",
                options: ["904", "917", "893", "927"],
                correctAnswer: 1
            }
        ];

        let score = 0;

        const quizHTML = `
            <div id="quiz-content">
                ${quizQuestions.map((q, index) => `
                    <div class="quiz-question">
                        <h3>${q.question}</h3>
                        ${q.options.map((option, optIndex) => `
                            <div class="form-check">
                                <input class="form-check-input" type="radio" 
                                       name="question${index}" 
                                       id="q${index}option${optIndex}"
                                       value="${optIndex}">
                                <label class="form-check-label" for="q${index}option${optIndex}">
                                    ${option}
                                </label>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
                <button id="submit-quiz" class="btn btn-primary mt-3">Submit Quiz</button>
                <div id="quiz-result" class="mt-3"></div>
            </div>
        `;

        quizContainer.innerHTML = quizHTML;

        document.getElementById('submit-quiz').addEventListener('click', () => {
            const resultContainer = document.getElementById('quiz-result');
            let userScore = 0;

            quizQuestions.forEach((q, index) => {
                const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
                if (selectedOption && parseInt(selectedOption.value) === q.correctAnswer) {
                    userScore++;
                }
            });

            resultContainer.innerHTML = `
                <div class="alert alert-info">
                    You scored ${userScore} out of ${quizQuestions.length}
                </div>
            `;
        });
    }

    // Initialize all interactive elements
    createRoyalLibraryScene();
    createTimeline();
    createQuiz();
});
