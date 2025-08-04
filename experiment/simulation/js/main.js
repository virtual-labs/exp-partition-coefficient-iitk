const experimentStates = {
    0: "Initial", 1: "Butanol poured", 2: "Ready for Acetic Acid", 3: "Acetic poured",
    4: "Water poured", 5: "Ready for cylinder pour 3", 6: "Ready for shake",
    7: "Shaking", 8: "Ready to separate", 9: "Separation done", 10: "Add Indicator", 
    11: "Ready for Burette", 12: "Burette Complete", 13: "Complete"
};

// Voice over support
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let voiceEnabled = true;

const elements = {
    f: 0,
    mcylender: document.querySelector("#gcylinder"),
    sol: document.querySelector("#solution"),
    drp1: document.querySelector("#drop1"),
    btnl: document.querySelector("#beaker1_butanol"),
    drp: document.querySelector("#drop"),
    acid: document.querySelector("#acetic"),
    wtr: document.querySelector("#water"),
    fsol: document.querySelector("#fsolution"),
    fsol1: document.querySelector("#fsolution1"),
    fsol2: document.querySelector("#fsolution2"),
    flask1: document.querySelector("#flask"),
    machineLP: document.querySelector("#machinelp"),
    machineUP: document.querySelector("#machineup"),
    machineUP1: document.querySelector("#machineup1"),
    machineUP2: document.querySelector("#machineup2"),
    powerbtn: document.querySelector("#powerbtn"),
    steps: document.querySelector("#step"),
    mxdsol: document.querySelector("#mixedsol"),
    cnflask1: document.querySelector("#conicalflaskE1"),
    cnflask2: document.querySelector("#conicalflaskE2"),
    pippetf: document.querySelector("#pippet"),
    orglayer: document.querySelector("#organiclayer"),
    aqlayer: document.querySelector("#aquaslayer"),
    burette: document.querySelector("#burette"),
    titrationFlask: document.querySelector("#titrationFlask"),
    activatorBottle: document.querySelector("#activatorbottelimage"),
    activatorDropper: document.querySelector("#activatordroperimage"),
    indicatorDrop: document.querySelector("#indicatorDrop"),
    baseSolution: document.querySelector("#baseSolution"),
    calculation: document.querySelector("#calculation"),
    progressContainer: document.querySelector("#progress-container"),
    progressBar: document.querySelector("#progress-bar"),
    progressText: document.querySelector("#progress-text"),
    washBtn: document.querySelector("#wash-btn"),
    washWater: document.querySelector("#wash-water"),
    washStream: document.querySelector("#wash-stream"),
    // New titration system elements
    uu1: document.querySelector("#uu1"),
    uu2: document.querySelector("#uu2"),
    brstand5f: document.querySelector("#brstand5f"),
    f1: document.querySelector("#f1"),
    f2: document.querySelector("#f2"),
    knob5f: document.querySelector("#knob5f"),
    droptaitration: document.querySelector("#droptaitration"),
    p1: document.querySelector("#p1"),
    p2: document.querySelector("#p2"),
    // New phenolphthalein dropper system elements
    s1: document.querySelector("#s1"),
    s2: document.querySelector("#s2"),
    vflk1: document.querySelector("#vflk1"),
    vflk2: document.querySelector("#vflk2"),
    act12: document.querySelector("#act12"),
    activaterdroper: document.querySelector("#activaterdroper"),
    drop0: document.querySelector("#drop0"),
    drop1: document.querySelector("#drop1")
};

// Voice over function
function speakInstruction(text) {
    if (!voiceEnabled || !speechSynthesis) return;
    
    try {
        // Stop any current speech
        if (currentUtterance) {
            speechSynthesis.cancel();
        }
        
        // Create new utterance
        currentUtterance = new SpeechSynthesisUtterance(text);
        currentUtterance.rate = 0.7;
        currentUtterance.pitch = 1;
        currentUtterance.volume = 0.8;
        
        // Try to use a female voice if available
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
            const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('female'));
            if (femaleVoice) {
                currentUtterance.voice = femaleVoice;
            }
        }
        
        speechSynthesis.speak(currentUtterance);
    } catch (error) {
        console.log('Speech synthesis not available:', error);
        voiceEnabled = false;
        const voiceToggle = document.getElementById('voice-toggle');
        if (voiceToggle) {
            voiceToggle.textContent = '🔇 VOICE OFF';
            voiceToggle.style.background = 'linear-gradient(135deg, hsl(0, 80%, 77%) 0%, hsl(0, 70%, 65%) 100%)';
        }
    }
}

// Voice toggle function
function toggleVoice() {
    if (!speechSynthesis) {
        alert('Speech synthesis is not available in your browser. Please use a modern browser with speech support.');
        return;
    }
    
    voiceEnabled = !voiceEnabled;
    const voiceToggle = document.getElementById('voice-toggle');
    
    if (voiceEnabled) {
        voiceToggle.textContent = '🔊 VOICE ON';
        voiceToggle.style.background = 'linear-gradient(135deg, hsl(120, 80%, 77%) 0%, hsl(120, 70%, 65%) 100%)';
        speakInstruction('Voice over enabled');
    } else {
        voiceToggle.textContent = '🔇 VOICE OFF';
        voiceToggle.style.background = 'linear-gradient(135deg, hsl(0, 80%, 77%) 0%, hsl(0, 70%, 65%) 100%)';
        // Stop any current speech
        if (currentUtterance) {
            speechSynthesis.cancel();
        }
    }
}

// Enhanced update step function with voice over
function updateStep(instruction, nextStep) {
    elements.steps.innerHTML = instruction;
    speakInstruction(instruction);
    // Only show next step if explicitly provided and after a longer delay
    if (nextStep) {
        setTimeout(() => {
            elements.steps.innerHTML = nextStep;
            speakInstruction(nextStep);
        }, 3500); // Shorter delay for concise instructions
    }
}

// Init
window.onload = initExperiment;

function initExperiment() {
    resetElements();
    updateStep("Rinse cylinder.");
    elements.f = 0;
}

function resetElements() {
    const hiddenElements = '#solution, #drop, #drop1, #wash-water, #wash-stream, #fsolution, #fsolution1, #fsolution2, #machinelp, #machineup, #machineup1, #machineup2, #powerbtn, #mixedsol, #conicalflaskE1, #conicalflaskE2, #pippet, #organiclayer, #aquaslayer, #burette, #titrationFlask, #indicator, #baseSolution, #calculation, #uu1, #uu2, #brstand5f, #f1, #f2, #knob5f, #droptaitration, #p1, #p2, #s1, #s2, #vflk1, #vflk2, #act12, #activaterdroper, #drop0, #drop1';
    const visibleElements = '#beaker1_butanol, #gcylinder, #acetic, #water, #flask';
    
    document.querySelectorAll(hiddenElements).forEach(el => el.style.visibility = 'hidden');
    document.querySelectorAll(visibleElements).forEach(el => el.style.visibility = 'visible');

    [elements.btnl, elements.acid, elements.wtr, elements.mcylender, elements.sol, elements.flask1]
        .forEach(el => el.style.transform = 'translate(0, 0) rotate(0)');

    elements.progressContainer.style.display = 'none';
    elements.progressBar.style.width = '0%';
    
    if (elements.washWater) {
        elements.washWater.classList.remove('wash-animation');
        elements.washStream.classList.remove('stream-animation');
        elements.mcylender.classList.remove('cylinder-wash-effect');
    }
}

function butanol1() {
    if (elements.f === 0) {
        updateStep("Adding butanol...");
        elements.btnl.style.transform = "translate(-40%, -100%) rotate(-60deg)";
        setTimeout(() => {
            elements.btnl.style.transform = "translate(0, 0) rotate(0)";
            elements.drp.style.visibility = "visible";
            elements.sol.style.visibility = "visible";
            setTimeout(() => {
                elements.drp.style.visibility = "hidden";
                elements.f = 1;
                updateStep("Butanol added! Pour into flask.");
            }, 300);
        }, 1000);
    }
}

function pourcylinder() {
    const targets = {
        1: { text: "Butanol poured! Rinse cylinder.", flask: elements.fsol },
        3: { text: "Acetic acid poured! Rinse cylinder.", flask: elements.fsol1 },
        5: { text: "Water poured! Click Next. Proceed to shaking.", flask: elements.fsol2 }
    };
    if (targets[elements.f]) {
        const { text, flask } = targets[elements.f];
        updateStep(text);
        elements.mcylender.style.transform = "translate(-330%, -170%) rotate(-80deg)";
        elements.sol.style.transform = "translate(-440%, -1000%) rotate(-80deg)";
        setTimeout(() => {
            elements.drp1.style.visibility = "visible";
            elements.drp1.style.transform = "translate(0, 180%)";
            elements.sol.style.visibility = "hidden";
            setTimeout(() => {
                flask.style.visibility = "visible";
                elements.drp1.style.visibility = "hidden";
                elements.mcylender.style.transform = "translate(0, 0) rotate(0)";
                elements.sol.style.transform = "translate(0, 0) rotate(0)";
                elements.f++;
            }, 2000);
        }, 1500);
    }
}

function acedic() {
    if (elements.f === 2) {
        updateStep("Adding acetic acid...");
        elements.acid.style.transform = "translate(-150%, -90%) rotate(-50deg)";
        setTimeout(() => {
            elements.acid.style.transform = "translate(0, 0) rotate(0)";
            elements.drp.style.visibility = "visible";
            elements.sol.style.visibility = "visible";
            setTimeout(() => {
                elements.drp.style.visibility = "hidden";
                elements.f = 3;
                updateStep("Acetic acid added! Pour into flask.");
            }, 300);
        }, 1500);
    }
}

function diswater() {
    if (elements.f === 4) {
        updateStep("Adding distilled water...");
        elements.wtr.style.transform = "translate(-260%, -110%) rotate(-50deg)";
        setTimeout(() => {
            elements.wtr.style.transform = "translate(0, 0) rotate(0)";
            elements.drp.style.visibility = "visible";
            elements.sol.style.visibility = "visible";
            setTimeout(() => {
                elements.drp.style.visibility = "hidden";
                elements.f = 5;
                updateStep("Water added! Pour into flask.");
            }, 300);
        }, 1500);
    }
}

function next() {
    if (elements.f === 6) {
        // Only show one instruction: Transferring solutions to the shaker machine
        updateStep("Transferring solutions to the shaker machine...");

        // Add visual feedback - highlight the flask
        elements.flask1.style.filter = "drop-shadow(0 0 10px rgba(52, 152, 219, 0.8))";
        elements.flask1.style.transform = "scale(1.05)";
        elements.flask1.style.transition = "all 0.5s ease";

        setTimeout(() => {
            // Hide original elements with fade effect
            [elements.btnl, elements.mcylender, elements.acid, elements.wtr, elements.sol].forEach(e => {
                e.style.transition = "all 0.8s ease";
                e.style.opacity = "0";
                setTimeout(() => e.style.visibility = "hidden", 800);
            });

            // Hide flask with special effect
            elements.flask1.style.transform = "scale(0.8) translateY(-20px)";
            elements.flask1.style.opacity = "0";
            setTimeout(() => elements.flask1.style.visibility = "hidden", 800);

            // Explicitly hide solution images
            [elements.fsol, elements.fsol1, elements.fsol2].forEach(e => {
                e.style.visibility = "hidden";
                e.style.opacity = "0";
            });

            // Show shaker elements (excluding solution images)
            [elements.machineLP, elements.machineUP, elements.powerbtn].forEach(e => {
                e.style.visibility = "visible";
                e.style.opacity = "0";
                e.style.transform = "scale(0.8)";
                setTimeout(() => {
                    e.style.transition = "all 0.5s ease";
                    e.style.opacity = "1";
                    e.style.transform = "scale(1)";
                }, 100);
            });

            setTimeout(() => {
                // Show ready state
                elements.machineUP.style.visibility = "hidden";
                elements.machineUP1.style.visibility = "visible";
                elements.machineUP1.style.animation = "pulse 2s infinite";
                elements.powerbtn.style.animation = "pulse 1.5s infinite";

                // Only show the next essential instruction
                updateStep("Click power button to start shaking.");
                elements.f = 7;
            }, 2500); // Allow time for animation
        }, 1000);
    }
}

function power() {
    if (elements.f === 7) {
        updateStep("Starting the shaking process...");
        
        // Remove pulse animations
        elements.machineUP1.style.animation = "";
        elements.powerbtn.style.animation = "";
        
        // Hide power button with effect
        elements.powerbtn.style.transform = "scale(0.8)";
        elements.powerbtn.style.opacity = "0";
        setTimeout(() => elements.powerbtn.style.visibility = "hidden", 300);
        
        // Show shaking state
        elements.machineUP1.style.visibility = "hidden";
        elements.machineUP2.style.visibility = "visible";
        elements.machineUP2.style.animation = "shake 0.5s infinite";

        // Add shake effect to machineLP
        elements.machineLP.classList.add("shake");
        elements.machineLP.style.animation = "shake 0.3s infinite";

        elements.progressContainer.style.display = 'block';
        elements.progressContainer.style.animation = "slideInFromTop 0.5s ease-out";

        let seconds = 0;
        const totalSeconds = 10;
        const interval = setInterval(() => {
            seconds++;
            const percent = (seconds / totalSeconds) * 100;
            elements.progressBar.style.width = `${percent}%`;
            elements.progressText.textContent = `Shaking: ${seconds}/${totalSeconds} seconds (simulating 60 minutes)`;
            
            // Add visual feedback based on progress
            if (seconds === 3) {
                updateStep("Shaking in progress - solutions are mixing thoroughly...");
            } else if (seconds === 6) {
                updateStep("Shaking continues - creating uniform mixture...");
            } else if (seconds === 9) {
                updateStep("Final moments of shaking - preparing for separation...");
            }

            if (seconds >= totalSeconds) {
                clearInterval(interval);
                elements.progressContainer.style.display = 'none';
                elements.machineLP.classList.remove("shake");
                elements.machineLP.style.animation = "";
                
                elements.machineUP2.style.animation = "";
                completeShaking();
            }
        }, 1000);
    }
}

function completeShaking() {
    updateStep("Shaking complete! Preparing for separation...");
    
    // Show completion effect
    elements.machineUP2.style.visibility = "hidden";
    elements.machineUP.style.visibility = "visible";
    elements.machineUP.style.animation = "fadeInScale 0.8s ease-out";
    
    // Add completion glow effect
    elements.machineLP.style.filter = "drop-shadow(0 0 15px rgba(76, 175, 80, 0.8))";
    setTimeout(() => {
        elements.machineLP.style.filter = "";
    }, 2000);

    setTimeout(() => {
        // Show mixed solution with dramatic effect
        elements.mxdsol.style.visibility = "visible";
        elements.mxdsol.style.opacity = "0";
        elements.mxdsol.style.transform = "scale(0.8)";
        elements.mxdsol.style.transition = "all 1s ease-out";
        
        setTimeout(() => {
            elements.mxdsol.style.opacity = "1";
            elements.mxdsol.style.transform = "scale(1)";
            elements.mxdsol.style.filter = "drop-shadow(0 0 10px rgba(52, 152, 219, 0.6))";
        }, 100);
        
        // Show pipette with animation
        setTimeout(() => {
            elements.pippetf.style.visibility = "visible";
            elements.pippetf.style.opacity = "0";
            elements.pippetf.style.transform = "translateY(20px)";
            elements.pippetf.style.transition = "all 0.8s ease-out";
            
            setTimeout(() => {
                elements.pippetf.style.opacity = "1";
                elements.pippetf.style.transform = "translateY(0)";
                elements.pippetf.style.animation = "pulse 2s infinite";
            }, 100);
            
            updateStep("Shaking complete! Click pipette to separate the solution layers");
        }, 800);
        
        elements.f = 8;
    }, 1000);
}

function completeTitration() {
    elements.progressContainer.style.display = 'none';
    elements.solutionClear.style.visibility = "hidden";
    elements.solutionPink.style.visibility = "hidden";
    showResults();
}

function separateSolution() {
    if (elements.f === 8) {
        updateStep("Starting separation process...");
        
        // Remove pulse animation from pipette
        elements.pippetf.style.animation = "";
        
        // Step 1: Move pipette to the top of the flask with proper motion
        updateStep("Moving pipette to the top of the flask...");
        elements.pippetf.style.animation = "pipetteMotion 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
        elements.pippetf.style.zIndex = "25";
        
        setTimeout(() => {
            updateStep("Positioning pipette tip for extraction...");
                // Step 2: Fine-tune pipette position at the very top of the flask
                elements.pippetf.style.animation = "none";
                elements.pippetf.style.transition = "all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                elements.pippetf.style.transform = "translate(32%, -50%) rotate(-55deg) scale(1.4)";
                elements.pippetf.style.filter = "drop-shadow(0 0 20px rgba(52, 152, 219, 0.9))";
                
                setTimeout(() => {
                    updateStep("Extracting organic layer from the mixture...");
                    
                    // Step 3: Start realistic extraction animation
                    elements.pippetf.style.transition = "all 3s ease-in-out";
                    elements.pippetf.style.transform = "translate(32%, -52%) rotate(-60deg) scale(1.5)";
                    elements.pippetf.style.filter = "drop-shadow(0 0 25px rgba(52, 152, 219, 1.0))";
                
                // Create enhanced extraction effect
                createExtractionEffect();
                
                // Add swirling effect to mixed solution
                elements.mxdsol.style.transition = "all 3s ease-in-out";
                elements.mxdsol.style.transform = "rotate(720deg) scale(0.7)";
                elements.mxdsol.style.filter = "hue-rotate(180deg) brightness(1.3)";
                
                // Create realistic extraction stream effect
                createRealisticExtractionStream();
                
                setTimeout(() => {
                    updateStep("Organic layer extracted successfully...");
                    
                    // Step 4: Pipette moves back with extracted solution
                    elements.pippetf.style.transition = "all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                    elements.pippetf.style.transform = "translate(0%, 0%) rotate(0deg) scale(1.0)";
                    elements.pippetf.style.filter = "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))";
                    elements.pippetf.style.zIndex = "10";
                    
                    setTimeout(() => {
                        // Hide mixed solution with dramatic fade
                        elements.mxdsol.style.opacity = "0";
                        elements.mxdsol.style.transform = "rotate(1080deg) scale(0.4)";
                        
                        setTimeout(() => {
                            elements.mxdsol.style.visibility = "hidden";
                            elements.pippetf.classList.remove('pipette-animation');
                            elements.pippetf.style.visibility = "hidden";
                            
                            // Show separated layers with enhanced animation
                            showSeparatedLayers();
                        }, 1000);
                    }, 2000);
                    
                }, 3000);
                
            }, 1500);
            
        }, 2500);
    }
}

function createExtractionEffect() {
    // Create bubbling effect during extraction
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.style.cssText = `
                position: absolute;
                width: ${4 + Math.random() * 6}px;
                height: ${4 + Math.random() * 6}px;
                background: rgba(255, 255, 0, 0.6);
                border-radius: 50%;
                left: ${40 + Math.random() * 8}%;
                top: ${50 + Math.random() * 10}%;
                z-index: 30;
                pointer-events: none;
                animation: titrationBubble 1.5s ease-out forwards;
            `;
            
            document.getElementById('beaker').appendChild(bubble);
            
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.remove();
                }
            }, 1500);
            
        }, i * 200);
    }
}

function createExtractionStream() {
    // Create extraction stream effect showing liquid being drawn up
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const stream = document.createElement('div');
            stream.style.cssText = `
                position: absolute;
                width: 3px;
                height: ${15 + Math.random() * 10}px;
                background: linear-gradient(to top, rgba(255, 165, 0, 0.8) 0%, rgba(255, 140, 0, 0.6) 50%, rgba(255, 165, 0, 0.3) 100%);
                border-radius: 2px;
                left: ${42 + Math.random() * 4}%;
                top: ${55 + Math.random() * 5}%;
                z-index: 31;
                pointer-events: none;
                animation: extractionStream 1.2s ease-out forwards;
            `;
            
            document.getElementById('beaker').appendChild(stream);
            
            setTimeout(() => {
                if (stream.parentNode) {
                    stream.remove();
                }
            }, 1200);
            
        }, i * 150);
    }
}

function createRealisticExtractionStream() {
    // Create realistic extraction stream effect showing organic layer being drawn up
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const stream = document.createElement('div');
            const streamWidth = 2 + Math.random() * 3;
            const streamHeight = 20 + Math.random() * 15;
            
            stream.style.cssText = `
                position: absolute;
                width: ${streamWidth}px;
                height: ${streamHeight}px;
                background: linear-gradient(to top, 
                    rgba(255, 140, 0, 0.9) 0%, 
                    rgba(255, 165, 0, 0.8) 30%, 
                    rgba(255, 140, 0, 0.6) 60%, 
                    rgba(255, 165, 0, 0.3) 100%);
                border-radius: ${streamWidth/2}px;
                left: ${43 + Math.random() * 3}%;
                top: ${58 + Math.random() * 3}%;
                z-index: 32;
                pointer-events: none;
                animation: realisticExtractionStream 2s ease-out forwards;
                box-shadow: 0 0 4px rgba(255, 140, 0, 0.5);
            `;
            
            document.getElementById('beaker').appendChild(stream);
            
            setTimeout(() => {
                if (stream.parentNode) {
                    stream.remove();
                }
            }, 2000);
            
        }, i * 100);
    }
    
    // Create additional suction effect
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const suction = document.createElement('div');
            suction.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, rgba(255, 140, 0, 0.7) 0%, rgba(255, 165, 0, 0.4) 50%, transparent 100%);
                border-radius: 50%;
                left: ${44 + Math.random() * 2}%;
                top: ${60 + Math.random() * 2}%;
                z-index: 33;
                pointer-events: none;
                animation: suctionEffect 1.5s ease-out forwards;
            `;
            
            document.getElementById('beaker').appendChild(suction);
            
            setTimeout(() => {
                if (suction.parentNode) {
                    suction.remove();
                }
            }, 1500);
            
        }, i * 300);
    }
}

function showSeparatedLayers() {
    updateStep("Separation complete! Two distinct layers have formed");
    
    // Show flasks with enhanced staggered animation - positioned apart
    setTimeout(() => {
        elements.cnflask1.style.visibility = "visible";
        elements.cnflask1.style.opacity = "0";
        elements.cnflask1.style.transform = "scale(0.8) translateY(20px)";
        elements.cnflask1.style.transition = "all 0.8s ease-out";
        elements.cnflask1.style.left = "50%"; // Position first flask
        elements.cnflask1.classList.add('separation-animation');
        
        setTimeout(() => {
            elements.cnflask1.style.opacity = "1";
            elements.cnflask1.style.transform = "scale(1) translateY(0)";
            elements.cnflask1.style.filter = "drop-shadow(0 0 8px rgba(52, 152, 219, 0.4))";
        }, 100);
    }, 300);
    
    setTimeout(() => {
        elements.cnflask2.style.visibility = "visible";
        elements.cnflask2.style.opacity = "0";
        elements.cnflask2.style.transform = "scale(0.8) translateY(20px)";
        elements.cnflask2.style.transition = "all 0.8s ease-out";
        elements.cnflask2.style.left = "60%"; // Position second flask apart
        elements.cnflask2.classList.add('separation-animation');
        
        setTimeout(() => {
            elements.cnflask2.style.opacity = "1";
            elements.cnflask2.style.transform = "scale(1) translateY(0)";
            elements.cnflask2.style.filter = "drop-shadow(0 0 8px rgba(52, 152, 219, 0.4))";
        }, 100);
    }, 600);
    
    // Show layers with enhanced color effects - positioned to match flasks
    setTimeout(() => {
        elements.orglayer.style.visibility = "visible";
        elements.orglayer.style.opacity = "0";
        elements.orglayer.style.transform = "scale(0.9)";
        elements.orglayer.style.transition = "all 1s ease-out";
        elements.orglayer.style.left = "50%"; // Match first flask position
        elements.orglayer.classList.add('separation-animation');
        
        setTimeout(() => {
            elements.orglayer.style.opacity = "1";
            elements.orglayer.style.transform = "scale(1)";
            // Add visual distinction for organic layer
            elements.orglayer.style.filter = "hue-rotate(30deg) brightness(1.1) drop-shadow(0 0 5px rgba(255, 165, 0, 0.3))";
        }, 200);
        
        setTimeout(() => {
            elements.aqlayer.style.visibility = "visible";
            elements.aqlayer.style.opacity = "0";
            elements.aqlayer.style.transform = "scale(0.9)";
            elements.aqlayer.style.transition = "all 1s ease-out";
            elements.aqlayer.style.left = "60%"; // Match second flask position
            elements.aqlayer.classList.add('separation-animation');
            
            setTimeout(() => {
                elements.aqlayer.style.opacity = "1";
                elements.aqlayer.style.transform = "scale(1)";
                // Add visual distinction for aqueous layer
                elements.aqlayer.style.filter = "hue-rotate(180deg) brightness(0.9) drop-shadow(0 0 5px rgba(0, 123, 255, 0.3))";
            }, 200);
            
            updateStep("Two distinct layers formed! Organic layer (top) and aqueous layer (bottom)");
            elements.f = 9;
            
            // Show composite activator bottle after delay
            setTimeout(showCompositeActivatorBottle, 3000);
        }, 800);
    }, 1000);
}



function addPhenolphthaleinToFlasks() {
    if (elements.f === 10) {
        updateStep("Adding phenolphthalein to both flasks...");
        
        // Remove click event
        elements.activaterdroper.onclick = null;
        
        // Start adding to first flask
        addToFirstFlask();
    }
}

function addToFirstFlask() {
    updateStep("Adding phenolphthalein to first flask...");
    
    // Move dropper to first flask position
    elements.activaterdroper.style.transition = "all 2s ease-in-out";
    elements.activaterdroper.style.left = "21%";
    elements.activaterdroper.style.top = "52%";
    
    setTimeout(() => {
        // Show drop animation
        elements.drop0.style.visibility = "visible";
        elements.drop0.style.transition = "all 1.5s ease-in-out";
        elements.drop0.style.top = "49%";
        
        setTimeout(() => {
            // Hide drop
            elements.drop0.style.visibility = "hidden";
            
            // Show number label
            elements.s1.style.visibility = "visible";
            
            // Add shake effect to flask
            elements.vflk1.classList.add('flask-shake');
            
            setTimeout(() => {
                // Remove shake effect
                elements.vflk1.classList.remove('flask-shake');
                
                // Move to second flask
                addToSecondFlask();
            }, 1200);
            
        }, 1500);
        
    }, 2000);
}

function addToSecondFlask() {
    updateStep("Adding phenolphthalein to second flask...");
    
    // Move dropper to second flask position
    elements.activaterdroper.style.transition = "all 2s ease-in-out";
    elements.activaterdroper.style.left = "30%";
    elements.activaterdroper.style.top = "52%";
    
    setTimeout(() => {
        // Show drop animation
        elements.drop1.style.visibility = "visible";
        elements.drop1.style.transition = "all 1.5s ease-in-out";
        elements.drop1.style.top = "49%";
        
        setTimeout(() => {
            // Hide drop
            elements.drop1.style.visibility = "hidden";
            
            // Show number label
            elements.s2.style.visibility = "visible";
            
            // Add shake effect to flask
            elements.vflk2.classList.add('flask-shake');
            
            setTimeout(() => {
                // Remove shake effect
                elements.vflk2.classList.remove('flask-shake');
                
                // Return dropper to original position
                elements.activaterdroper.style.transition = "all 2s ease-in-out";
                elements.activaterdroper.style.left = "60%";
                elements.activaterdroper.style.top = "52%";
                
                setTimeout(() => {
                    // Hide phenolphthalein elements
                    elements.act12.style.visibility = "hidden";
                    elements.activaterdroper.style.visibility = "hidden";
                    elements.vflk1.style.visibility = "hidden";
                    elements.vflk2.style.visibility = "hidden";
                    elements.s1.style.visibility = "hidden";
                    elements.s2.style.visibility = "hidden";
                    
                    // Show original flasks
                    elements.cnflask1.style.visibility = "visible";
                    elements.cnflask2.style.visibility = "visible";
                    elements.orglayer.style.visibility = "visible";
                    elements.aqlayer.style.visibility = "visible";
                    
                    updateStep("Phenolphthalein added to both flasks! Proceeding to titration...");
                    
                    // Start burette step
                    setTimeout(() => {
                        startBuretteStep();
                    }, 2000);
                    
                }, 2000);
                
            }, 1200);
            
        }, 1500);
        
    }, 2000);
}

// Old phenolphthalein functions removed - replaced with new system



function showCompositeActivatorBottle() {
    updateStep("Setting up phenolphthalein dropper...");
    
    // Show new phenolphthalein system elements
    setTimeout(() => {
        elements.act12.style.visibility = "visible";
        elements.activaterdroper.style.visibility = "visible";
        elements.vflk1.style.visibility = "visible";
        elements.vflk2.style.visibility = "visible";
        elements.s1.style.visibility = "visible";
        elements.s2.style.visibility = "visible";
        
        // Hide old elements
        elements.cnflask1.style.visibility = "hidden";
        elements.cnflask2.style.visibility = "hidden";
        elements.orglayer.style.visibility = "hidden";
        elements.aqlayer.style.visibility = "hidden";
        
        // Add click event for dropper
        elements.activaterdroper.onclick = addPhenolphthaleinToFlasks;
        
        updateStep("Click on activator dropper to add phenolphthalein to both flasks");
        elements.f = 10;
    }, 1000);
}

function startBuretteStep() {
    updateStep("Setting up titration apparatus...");
    elements.f = 11;
    
    // Skip all burette animations and go directly to new titration system
    setTimeout(() => {
        startNewTitrationSystem();
    }, 1000);
}



function titrateBothFlasks() {
    updateStep("Starting new titration system...");
    
    // Remove click event and animation from burette
    elements.burette.onclick = null;
    elements.burette.style.animation = "";
    
    // Start the new titration system
    startNewTitrationSystem();
}

function startNewTitrationSystem() {
    updateStep("Titration apparatus ready!");
    
    // Show the new titration elements
    elements.brstand5f.style.visibility = "visible";
    elements.f1.style.visibility = "visible";
    elements.f2.style.visibility = "visible";
    elements.knob5f.style.visibility = "visible";
    elements.droptaitration.style.visibility = "visible";
    elements.uu1.style.visibility = "visible";
    elements.uu2.style.visibility = "visible";
    
    // Hide the old elements
    elements.cnflask1.style.visibility = "hidden";
    elements.cnflask2.style.visibility = "hidden";
    elements.orglayer.style.visibility = "hidden";
    elements.aqlayer.style.visibility = "hidden";
    elements.burette.style.visibility = "hidden";
    
    // Add click events
    elements.f1.onclick = () => titrateFlask(1);
    elements.f2.onclick = () => titrateFlask(2);
    elements.knob5f.onclick = () => turnKnob();
    
    updateStep("Click on flask 1 to start titration");
}

function titrateFlask(flaskNumber) {
    updateStep(`Titrating flask ${flaskNumber}...`);
    
    const flask = flaskNumber === 1 ? elements.f1 : elements.f2;
    const pinkSolution = flaskNumber === 1 ? elements.p1 : elements.p2;
    const numberLabel = flaskNumber === 1 ? elements.uu1 : elements.uu2;
    
    // Store original flask position
    const originalLeft = getComputedStyle(flask).left;
    const originalTop = getComputedStyle(flask).top;
    
    // Hide the flask
    flask.style.visibility = "hidden";
    
    // Show drop animation
    elements.droptaitration.style.visibility = "visible";
    elements.droptaitration.style.animation = "dropToFlask 2s ease-out forwards";
    
    setTimeout(() => {
        // Hide drop
        elements.droptaitration.style.visibility = "hidden";
        
        // Show pink solution with shake effect at burette position
        pinkSolution.style.visibility = "visible";
        pinkSolution.style.opacity = "1";
        pinkSolution.style.left = "64.2%";
        pinkSolution.style.top = "56%";
        pinkSolution.classList.add('flask-shake');
        
        // Show number label
        numberLabel.style.visibility = "visible";
        
        setTimeout(() => {
            // Remove shake effect
            pinkSolution.classList.remove('flask-shake');
            
            // Move pink solution back to original flask position
            updateStep("Moving titrated solution back to original position...");
            pinkSolution.style.transition = "all 2s ease-in-out";
            pinkSolution.style.left = originalLeft;
            pinkSolution.style.top = originalTop;
            
            setTimeout(() => {
                // Hide pink solution and show original flask
                pinkSolution.style.visibility = "hidden";
                flask.style.visibility = "visible";
                
                if (flaskNumber === 1) {
                    updateStep("Flask 1 titrated! Click on flask 2 to continue");
                } else {
                    updateStep("Both flasks titrated! Titration complete");
                    setTimeout(() => {
                        completeNewTitration();
                    }, 2000);
                }
            }, 2000);
            
        }, 1200);
        
    }, 2000);
}

function turnKnob() {
    updateStep("Turning burette knob...");
    
    // Add rotation effect to knob
    elements.knob5f.style.transform = "rotate(180deg)";
    elements.knob5f.style.transition = "transform 1s ease-in-out";
    
    setTimeout(() => {
        elements.knob5f.style.transform = "rotate(0deg)";
        updateStep("Knob turned! Ready for titration");
    }, 1000);
}

function completeNewTitration() {
    updateStep("Calculating results...");
    
    // Hide titration elements
    elements.brstand5f.style.visibility = "hidden";
    elements.f1.style.visibility = "hidden";
    elements.f2.style.visibility = "hidden";
    elements.knob5f.style.visibility = "hidden";
    elements.droptaitration.style.visibility = "hidden";
    elements.uu1.style.visibility = "hidden";
    elements.uu2.style.visibility = "hidden";
    elements.p1.style.visibility = "hidden";
    elements.p2.style.visibility = "hidden";
    
    // Show results
    setTimeout(() => {
        showResults();
    }, 2000);
    
    elements.f = 12;
}

// Old titration functions removed - replaced with new titration system





function createParticleEffects() {
    // Create floating particles around the experiment area
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${3 + Math.random() * 4}px;
                height: ${3 + Math.random() * 4}px;
                background: radial-gradient(circle, rgba(52, 152, 219, 0.8) 0%, rgba(52, 152, 219, 0.4) 50%, transparent 100%);
                border-radius: 50%;
                left: ${20 + Math.random() * 60}%;
                top: ${30 + Math.random() * 40}%;
                z-index: 5;
                pointer-events: none;
                animation: particleFloat 4s ease-out infinite;
                box-shadow: 0 0 6px rgba(52, 152, 219, 0.6);
            `;
            
            document.getElementById('beaker').appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 4000);
        }, i * 200);
    }
}

function createSparkleEffects() {
    // Create sparkle effects around the burette
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, rgba(255, 215, 0, 1) 0%, rgba(255, 215, 0, 0.6) 50%, transparent 100%);
                border-radius: 50%;
                left: ${75 + Math.random() * 10}%;
                top: ${45 + Math.random() * 10}%;
                z-index: 40;
                pointer-events: none;
                animation: sparkle 1.5s ease-out forwards;
                box-shadow: 0 0 8px rgba(255, 215, 0, 0.8);
            `;
            
            document.getElementById('beaker').appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 1500);
        }, i * 100);
    }
}

function createCelebrationEffects() {
    // Create celebration particle effects
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const celebration = document.createElement('div');
            const colors = ['#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FF6347'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            celebration.style.cssText = `
                position: absolute;
                width: ${4 + Math.random() * 6}px;
                height: ${4 + Math.random() * 6}px;
                background: radial-gradient(circle, ${randomColor} 0%, ${randomColor}80 50%, transparent 100%);
                border-radius: 50%;
                left: ${45 + Math.random() * 20}%;
                top: ${50 + Math.random() * 15}%;
                z-index: 50;
                pointer-events: none;
                animation: particleFloat 3s ease-out forwards;
                box-shadow: 0 0 10px ${randomColor}80;
            `;
            
            document.getElementById('beaker').appendChild(celebration);
            
            setTimeout(() => {
                if (celebration.parentNode) {
                    celebration.remove();
                }
            }, 3000);
        }, i * 80);
    }
}

function createActivatorDropsForBothFlasks() {
    // Create drops for both flasks (organic and aqueous layers)
    for (let i = 0; i < 3; i++) {
        // Drop for organic layer (first flask)
        setTimeout(() => {
            const drop1 = document.createElement('img');
            drop1.src = 'images/activator drop.png';
            drop1.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                left: 50%;
                top: 55%;
                z-index: 35;
                pointer-events: none;
                animation: activatorDropFall 1.5s ease-out forwards;
                filter: drop-shadow(0 0 5px rgba(255, 20, 147, 0.6));
            `;
            
            document.getElementById('beaker').appendChild(drop1);
            
            setTimeout(() => {
                if (drop1.parentNode) {
                    drop1.remove();
                }
            }, 1500);
            
        }, i * 200);
        
        // Drop for aqueous layer (second flask)
        setTimeout(() => {
            const drop2 = document.createElement('img');
            drop2.src = 'images/activator drop.png';
            drop2.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                left: 60%;
                top: 55%;
                z-index: 35;
                pointer-events: none;
                animation: activatorDropFall 1.5s ease-out forwards;
                filter: drop-shadow(0 0 5px rgba(255, 20, 147, 0.6));
            `;
            
            document.getElementById('beaker').appendChild(drop2);
            
            setTimeout(() => {
                if (drop2.parentNode) {
                    drop2.remove();
                }
            }, 1500);
            
        }, i * 200 + 100);
    }
}

function createIndicatorDrops() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const drop = document.createElement('div');
            drop.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, rgba(255, 20, 147, 0.9) 0%, rgba(255, 20, 147, 0.6) 100%);
                border-radius: 50%;
                left: ${48 + Math.random() * 4}%;
                top: ${55 + Math.random() * 5}%;
                z-index: 35;
                pointer-events: none;
                animation: indicatorDrop 1.2s ease-out forwards;
            `;
            
            document.getElementById('beaker').appendChild(drop);
            
            setTimeout(() => {
                if (drop.parentNode) {
                    drop.remove();
                }
            }, 1200);
            
        }, i * 150);
    }
}

function simulateTitration() {
    updateStep("Titration in progress - adding base dropwise...", "Carefully adding base solution to reach endpoint");
    elements.progressContainer.style.display = 'block';
    
    // Create titration visual effects
    createTitrationEffects();

    let seconds = 0;
    const totalSeconds = 8;

    const interval = setInterval(() => {
        seconds++;
        const percent = (seconds / totalSeconds) * 100;
        elements.progressBar.style.width = `${percent}%`;
        elements.progressText.textContent = `Titration progress: ${seconds}/${totalSeconds} seconds`;
        
        // Add titration drops during process
        if (seconds % 2 === 0) {
            createTitrationDrop();
        }
        
        // Gradually change solution colors
        const hueShift = (seconds / totalSeconds) * 60;
        elements.orglayer.style.filter = `hue-rotate(${hueShift}deg) brightness(${1 + seconds * 0.02})`;
        elements.aqlayer.style.filter = `hue-rotate(${hueShift + 180}deg) brightness(${1 + seconds * 0.02})`;

        if (seconds >= totalSeconds) {
            clearInterval(interval);
            elements.progressContainer.style.display = 'none';
            
            // Final color change to indicate endpoint
            elements.orglayer.style.filter = "hue-rotate(320deg) brightness(1.3)";
            elements.aqlayer.style.filter = "hue-rotate(320deg) brightness(1.3)";
            
            updateStep("Titration complete! Endpoint reached.", "Analyzing results and calculating partition coefficient...");
            
            setTimeout(showResults, 1500);
        }
    }, 1000);
}

function createTitrationEffects() {
    // Create continuous bubbling effect
    const bubbleInterval = setInterval(() => {
        createTitrationBubble();
    }, 300);
    
    setTimeout(() => {
        clearInterval(bubbleInterval);
    }, 8000);
}

function createTitrationDrop() {
    const drop = document.createElement('div');
    drop.style.cssText = `
        position: absolute;
        width: 4px;
        height: 8px;
        background: linear-gradient(to bottom, rgba(0, 255, 127, 0.9) 0%, rgba(0, 255, 127, 0.6) 100%);
        border-radius: 2px;
        left: ${52 + Math.random() * 2}%;
        top: 45%;
        z-index: 40;
        pointer-events: none;
        animation: dropFall 1s ease-in forwards;
    `;
    
    document.getElementById('beaker').appendChild(drop);
    
    setTimeout(() => {
        if (drop.parentNode) {
            drop.remove();
        }
    }, 1000);
}

function createTitrationBubble() {
    const bubble = document.createElement('div');
    bubble.style.cssText = `
        position: absolute;
        width: ${3 + Math.random() * 4}px;
        height: ${3 + Math.random() * 4}px;
        background: rgba(0, 255, 127, 0.5);
        border-radius: 50%;
        left: ${50 + Math.random() * 6}%;
        top: ${65 + Math.random() * 5}%;
        z-index: 35;
        pointer-events: none;
        animation: titrationBubble 1.2s ease-out forwards;
    `;
    
    document.getElementById('beaker').appendChild(bubble);
    
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.remove();
        }
    }, 1200);
}

function showResults() {
    updateStep("Calculating partition coefficient...");
    
    // Create quantum calculation effects
    createQuantumCalculationEffects();
    
    // Show calculation panel with glow effect
    elements.calculation.style.display = "block";
    elements.calculation.style.visibility = "visible";
    elements.calculation.classList.add('calculation-animation');
    elements.calculation.classList.remove("hidden");
    elements.calculation.style.animation = "glowPulse 2s ease-in-out infinite";
    
    // Generate and animate results
    const volume1 = (8 + Math.random() * 2).toFixed(2);
    const volume2 = (12 + Math.random() * 3).toFixed(2);
    const conc1 = (0.08 + Math.random() * 0.02).toFixed(4);
    const conc2 = (0.12 + Math.random() * 0.03).toFixed(4);
    const kd = (conc1 / conc2).toFixed(4);
    
    // Animate each result appearing
    setTimeout(() => {
        const vol1Element = document.getElementById("volume1");
        vol1Element.textContent = volume1;
        vol1Element.classList.add('number-animation');
    }, 500);
    
    setTimeout(() => {
        const vol2Element = document.getElementById("volume2");
        vol2Element.textContent = volume2;
        vol2Element.classList.add('number-animation');
    }, 800);
    
    setTimeout(() => {
        const conc1Element = document.getElementById("conc1");
        conc1Element.textContent = conc1;
        conc1Element.classList.add('number-animation');
    }, 1100);
    
    setTimeout(() => {
        const conc2Element = document.getElementById("conc2");
        conc2Element.textContent = conc2;
        conc2Element.classList.add('number-animation');
    }, 1400);
    
    setTimeout(() => {
        const kdElement = document.getElementById("kd");
        kdElement.textContent = kd;
        kdElement.classList.add('number-animation');
        kdElement.style.color = "#e74c3c";
        kdElement.style.fontSize = "1.2em";
        kdElement.style.animation = "glowPulse 1s ease-in-out infinite";
        
        // Create enhanced celebration effect
        createEnhancedCelebrationEffect();
        
        updateStep("Experiment completed successfully! Partition coefficient calculated.");
        elements.f = 13;
    }, 1700);
}

function createQuantumCalculationEffects() {
    // Create quantum calculation particles
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const quantum = document.createElement('div');
            const colors = ['#FFD700', '#00CED1', '#FF69B4', '#32CD32'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            quantum.style.cssText = `
                position: absolute;
                width: ${2 + Math.random() * 3}px;
                height: ${2 + Math.random() * 3}px;
                background: radial-gradient(circle, ${randomColor} 0%, ${randomColor}80 50%, transparent 100%);
                border-radius: 50%;
                left: ${60 + Math.random() * 30}%;
                top: ${10 + Math.random() * 20}%;
                z-index: 60;
                pointer-events: none;
                animation: particleFloat 3s ease-out forwards;
                box-shadow: 0 0 8px ${randomColor}80;
            `;
            
            document.getElementById('beaker').appendChild(quantum);
            
            setTimeout(() => {
                if (quantum.parentNode) {
                    quantum.remove();
                }
            }, 3000);
        }, i * 120);
    }
}

function createEnhancedCelebrationEffect() {
    // Create enhanced celebration effects
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const celebration = document.createElement('div');
            const colors = ['#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FF6347', '#9370DB'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            celebration.style.cssText = `
                position: absolute;
                width: ${3 + Math.random() * 5}px;
                height: ${3 + Math.random() * 5}px;
                background: radial-gradient(circle, ${randomColor} 0%, ${randomColor}80 50%, transparent 100%);
                border-radius: 50%;
                left: ${60 + Math.random() * 30}%;
                top: ${10 + Math.random() * 20}%;
                z-index: 70;
                pointer-events: none;
                animation: particleFloat 4s ease-out forwards;
                box-shadow: 0 0 12px ${randomColor}80;
            `;
            
            document.getElementById('beaker').appendChild(celebration);
            
            setTimeout(() => {
                if (celebration.parentNode) {
                    celebration.remove();
                }
            }, 4000);
        }, i * 60);
    }
    
    // Create sparkle effects around the result
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, rgba(255, 215, 0, 1) 0%, rgba(255, 215, 0, 0) 100%);
                border-radius: 50%;
                left: ${70 + Math.random() * 20}%;
                top: ${75 + Math.random() * 15}%;
                z-index: 70;
                pointer-events: none;
                animation: sparkle 2s ease-out forwards;
                box-shadow: 0 0 8px rgba(255, 215, 0, 0.8);
            `;
            
            document.getElementById('beaker').appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 2000);
            
        }, i * 80);
    }
}

function createCelebrationEffect() {
    // Create sparkle effects around the result
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(255, 215, 0, 1) 0%, rgba(255, 215, 0, 0) 100%);
                border-radius: 50%;
                left: ${70 + Math.random() * 20}%;
                top: ${75 + Math.random() * 15}%;
                z-index: 50;
                pointer-events: none;
                animation: titrationBubble 2s ease-out forwards;
                box-shadow: 0 0 6px rgba(255, 215, 0, 0.8);
            `;
            
            document.getElementById('beaker').appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 2000);
            
        }, i * 100);
    }
}

function repeatExperiment() {
    if (confirm("Do you want to repeat the experiment?")) {
        initExperiment();
    }
}

function washCylinder() {
    // Determine current state and show appropriate instruction
    let washInstruction = "";
    let nextInstruction = "";
    
    if (elements.f === 0) {
        washInstruction = "Rinsing cylinder...";
        nextInstruction = "Cylinder clean! Add butanol.";
    } else if (elements.f === 2) {
        washInstruction = "Rinsing cylinder...";
        nextInstruction = "Cylinder clean! Click acetic acid beaker.";
    } else if (elements.f === 4) {
        washInstruction = "Rinsing cylinder...";
        nextInstruction = "Cylinder clean! Click distilled water beaker.";
    } else {
        washInstruction = "Rinsing cylinder...";
        nextInstruction = "Cylinder ready!";
    }
    // Show instruction
    updateStep(washInstruction);
    // No motion for water bottle during rinsing - it stays stationary
    setTimeout(() => {
        elements.washWater.style.visibility = "visible";
        elements.washStream.style.visibility = "visible";
        elements.washWater.classList.add('wash-animation');
        elements.washStream.classList.add('stream-animation');
        elements.mcylender.classList.add('cylinder-wash-effect');
        createEnhancedWashEffects();
        handleSolutionWashing();
    }, 1200);
    setTimeout(() => {
        stopWashEffects();
        updateStep(nextInstruction);
    }, 4000);
}

function createEnhancedWashEffects() {
    // Create continuous water droplets
    let dropInterval = setInterval(() => {
        createWashDrop();
    }, 150);
    
    // Stop creating drops after 4 seconds
    setTimeout(() => {
        clearInterval(dropInterval);
    }, 4000);
    
    // Create water ripples in cylinder
    setTimeout(() => {
        createWaterRipples();
    }, 800);
}

function createWashDrop() {
    const washDrop = document.createElement('div');
    const randomOffset = (Math.random() - 0.5) * 2; // -1 to +1
    
    washDrop.style.cssText = `
        position: absolute;
        width: ${6 + Math.random() * 4}px;
        height: ${6 + Math.random() * 4}px;
        background: radial-gradient(circle, rgba(135, 206, 235, 0.9) 0%, rgba(135, 206, 235, 0.6) 50%, rgba(135, 206, 235, 0.3) 100%);
        border-radius: 50%;
        left: ${53.5 + randomOffset}%;
        top: ${35 + Math.random() * 5}%;
        z-index: 25;
        pointer-events: none;
        animation: dropFall 1.5s ease-in forwards;
        box-shadow: 0 2px 4px rgba(135, 206, 235, 0.3);
    `;
    
    // Add CSS animation for drop fall
    if (!document.getElementById('dropFallStyle')) {
        const style = document.createElement('style');
        style.id = 'dropFallStyle';
        style.textContent = `
            @keyframes dropFall {
                0% { 
                    transform: translateY(0) scale(1);
                    opacity: 0.9;
                }
                50% { 
                    transform: translateY(100px) scale(1.1);
                    opacity: 0.7;
                }
                100% { 
                    transform: translateY(200px) scale(0.8);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.getElementById('beaker').appendChild(washDrop);
    
    // Remove the drop after animation
    setTimeout(() => {
        if (washDrop.parentNode) {
            washDrop.remove();
        }
    }, 1500);
}

function createWaterRipples() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border: 2px solid rgba(135, 206, 235, 0.6);
                border-radius: 50%;
                left: 54%;
                top: 68%;
                z-index: 20;
                pointer-events: none;
                animation: rippleExpand 2s ease-out forwards;
            `;
            
            // Add ripple animation
            if (!document.getElementById('rippleStyle')) {
                const style = document.createElement('style');
                style.id = 'rippleStyle';
                style.textContent = `
                    @keyframes rippleExpand {
                        0% { 
                            transform: scale(0.5);
                            opacity: 0.8;
                        }
                        100% { 
                            transform: scale(3);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.getElementById('beaker').appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 2000);
            
        }, i * 500);
    }
}

function createWashSplash() {
    // Create splash effect at cylinder base
    const splash = document.createElement('div');
    splash.style.cssText = `
        position: absolute;
        width: 30px;
        height: 15px;
        background: radial-gradient(ellipse, rgba(135, 206, 235, 0.7) 0%, rgba(135, 206, 235, 0.3) 70%, transparent 100%);
        border-radius: 50%;
        left: 53%;
        top: 70%;
        z-index: 20;
        pointer-events: none;
        animation: splashEffect 1s ease-out forwards;
    `;
    
    // Add splash animation
    if (!document.getElementById('splashStyle')) {
        const style = document.createElement('style');
        style.id = 'splashStyle';
        style.textContent = `
            @keyframes splashEffect {
                0% { 
                    transform: scale(0.5) translateY(0);
                    opacity: 0.8;
                }
                50% { 
                    transform: scale(1.5) translateY(-5px);
                    opacity: 0.9;
                }
                100% { 
                    transform: scale(2) translateY(-10px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.getElementById('beaker').appendChild(splash);
    
    setTimeout(() => {
        if (splash.parentNode) {
            splash.remove();
        }
    }, 1000);
}

function handleSolutionWashing() {
    if (elements.sol.style.visibility === "visible") {
        // Create swirling effect as solution is washed away
        elements.sol.style.transition = "all 2s ease-in-out";
        elements.sol.style.transform = "rotate(360deg) scale(0.5)";
        elements.sol.style.opacity = "0.3";
        
        setTimeout(() => {
            elements.sol.style.opacity = "0";
            setTimeout(() => {
                elements.sol.style.transform = "rotate(0deg) scale(1)";
                elements.sol.style.opacity = "1";
                elements.sol.style.visibility = "hidden";
                elements.sol.style.transition = "all 1.58s ease";
            }, 1000);
        }, 1500);
    }
}

function stopWashEffects() {
    // Hide wash effects
    elements.washWater.style.visibility = "hidden";
    elements.washStream.style.visibility = "hidden";
    
    // Remove animation classes
    elements.washWater.classList.remove('wash-animation');
    elements.washStream.classList.remove('stream-animation');
    elements.mcylender.classList.remove('cylinder-wash-effect');
    
    // Reset opacity
    elements.washWater.style.opacity = "0.8";
    elements.washStream.style.opacity = "0.8";
}
