document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const cursorGlow = document.querySelector('.cursor-glow');
    
    hamburger?.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                navMenu?.classList.remove('active');
                const spans = hamburger?.querySelectorAll('span');
                if (spans) {
                    spans[0].style.transform = '';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = '';
                }
            }
        });
    });

    if (cursorGlow) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
        
        function animateCursor() {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            
            cursorGlow.style.left = currentX + 'px';
            cursorGlow.style.top = currentY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
    }

    const aiToolForm = document.getElementById('aiToolForm');
    const strategyOutput = document.getElementById('strategyOutput');
    const emailCapture = document.getElementById('emailCapture');
    const strategyCaptureForm = document.getElementById('strategyCaptureForm');
    
    const strategies = {
        ecommerce: {
            leads: {
                pillars: ['Product showcases with lifestyle context', 'User-generated content campaigns', 'Behind-the-scenes production stories', 'Limited-time offers and flash sales'],
                hashtags: ['#ecommerce #onlineshopping #shopnow', '#productlaunch #newcollection', 'Branded hashtags for community building'],
                schedule: 'Post 2x daily: 9AM (product features) & 7PM (lifestyle content). Stories throughout the day.'
            },
            sales: {
                pillars: ['Product demonstrations and tutorials', 'Customer testimonials and reviews', 'Comparison content vs competitors', 'Bundle deals and value propositions'],
                hashtags: ['#sale #discount #limitedoffer', '#testimonial #review #happycustomer', 'Location-based hashtags for local reach'],
                schedule: 'Post daily at peak shopping hours: 12PM & 8PM. Weekend flash sales.'
            },
            brand: {
                pillars: ['Brand story and mission content', 'Founder journey and team highlights', 'Sustainability and ethical practices', 'Community impact and partnerships'],
                hashtags: ['#brandstory #mission #values', '#sustainability #ethicalfashion', 'Industry-specific thought leadership tags'],
                schedule: 'Post 4-5x weekly focusing on storytelling. IGTV for longer narratives.'
            },
            engagement: {
                pillars: ['Interactive polls and quizzes', 'User challenges and contests', 'Q&A sessions and AMAs', 'Community spotlights and features'],
                hashtags: ['#community #contest #giveaway', '#qanda #askmeanything', 'Trending challenge hashtags'],
                schedule: 'Daily posts with high interaction potential. Peak hours: 6-9PM.'
            },
            followers: {
                pillars: ['Viral-worthy entertaining content', 'Educational how-to guides', 'Trending audio and meme content', 'Collaboration with micro-influencers'],
                hashtags: ['Mix of 10 trending, 10 niche, 10 branded', '#viral #trending #explore', 'Audio and meme-specific tags'],
                schedule: 'Post 2-3x daily. Reels daily. Stories 5-7x daily.'
            }
        },
        saas: {
            leads: {
                pillars: ['Feature tutorials and walkthroughs', 'Customer success stories', 'Industry insights and trends', 'Free tool releases and updates'],
                hashtags: ['#saas #software #tech', '#productivity #efficiency', 'Industry-specific solution tags'],
                schedule: 'Post weekdays at 10AM & 2PM when B2B audience is most active.'
            },
            sales: {
                pillars: ['ROI calculators and case studies', 'Competitor comparison content', 'Limited-time pricing offers', 'Demo booking campaigns'],
                hashtags: ['#b2b #enterprise #solution', '#casestudy #roi #results', 'Problem-specific hashtags'],
                schedule: 'Tuesday-Thursday focus for B2B. Morning posts for decision-makers.'
            },
            brand: {
                pillars: ['Thought leadership content', 'Company culture and values', 'Product roadmap previews', 'Industry event coverage'],
                hashtags: ['#thoughtleadership #innovation', '#companyculture #team', 'Event and conference hashtags'],
                schedule: 'Post 3-4x weekly. LinkedIn cross-posting for B2B reach.'
            },
            engagement: {
                pillars: ['Weekly tips and tricks', 'User community highlights', 'Feature request discussions', 'Live product updates'],
                hashtags: ['#tips #tutorial #howto', '#community #users', 'Feature-specific tags'],
                schedule: 'Daily tips at 11AM. Community features on Fridays.'
            },
            followers: {
                pillars: ['Industry memes and humor', 'Quick productivity hacks', 'Tool stack recommendations', 'Founder stories and insights'],
                hashtags: ['#startuplife #techhumor', '#productivity #tools', 'Trending tech hashtags'],
                schedule: 'Post 1-2x daily. Focus on shareable content formats.'
            }
        },
        coaching: {
            leads: {
                pillars: ['Transformation stories and testimonials', 'Free value-packed mini trainings', 'Live Q&A sessions', 'Email list building with lead magnets'],
                hashtags: ['#coaching #transformation #success', '#mindset #growth #development', 'Niche-specific coaching tags'],
                schedule: 'Post daily at 7AM (motivation) & 5PM (education). Live sessions weekly.'
            },
            sales: {
                pillars: ['Program breakdowns and benefits', 'Limited enrollment announcements', 'Client results and case studies', 'Discovery call booking campaigns'],
                hashtags: ['#coaching #mentorship #program', '#results #transformation', 'Investment and ROI tags'],
                schedule: 'Launch sequences: 2x daily during enrollment periods.'
            },
            brand: {
                pillars: ['Personal story and journey', 'Methodology and framework explanations', 'Industry expertise demonstrations', 'Media features and credentials'],
                hashtags: ['#expertcoach #authority #credibility', '#methodology #framework', 'Certification and credential tags'],
                schedule: 'Post 4-5x weekly. Long-form content on weekends.'
            },
            engagement: {
                pillars: ['Daily motivation and quotes', 'Interactive coaching exercises', 'Community challenges', 'Follower success spotlights'],
                hashtags: ['#motivation #inspiration #quotes', '#challenge #exercise', 'Community-building tags'],
                schedule: 'Morning motivation at 6AM. Engagement posts at peak hours.'
            },
            followers: {
                pillars: ['Viral motivational content', 'Relatable struggle stories', 'Quick tip carousels', 'Collaboration with other coaches'],
                hashtags: ['#viral #motivation #inspiration', '#relatable #real #authentic', 'Collaboration and feature tags'],
                schedule: 'Post 2-3x daily. Reels for reach. Stories for connection.'
            }
        },
        agency: {
            leads: {
                pillars: ['Client results and case studies', 'Industry reports and insights', 'Free audits and assessments', 'Educational marketing content'],
                hashtags: ['#marketingagency #digitalmarketing', '#results #casestudy #roi', 'Service-specific tags'],
                schedule: 'Post weekdays at B2B optimal times: 9AM & 1PM.'
            },
            sales: {
                pillars: ['Service package breakdowns', 'Before/after transformations', 'Client testimonial videos', 'Strategy session bookings'],
                hashtags: ['#agency #marketing #growth', '#testimonial #results', 'Industry and service tags'],
                schedule: 'Focus on Tuesday-Thursday for B2B engagement.'
            },
            brand: {
                pillars: ['Team expertise highlights', 'Agency culture and values', 'Industry thought leadership', 'Award wins and recognitions'],
                hashtags: ['#agencylife #team #culture', '#thoughtleadership #expertise', 'Award and recognition tags'],
                schedule: 'Post 3-4x weekly. Team content on Fridays.'
            },
            engagement: {
                pillars: ['Marketing tips and tricks', 'Industry news commentary', 'Follower Q&A sessions', 'Tool and resource shares'],
                hashtags: ['#marketingtips #tips #tricks', '#industrynews #trends', 'Tool and resource tags'],
                schedule: 'Daily tips. News commentary as it happens.'
            },
            followers: {
                pillars: ['Marketing memes and humor', 'Quick tip videos', 'Industry hot takes', 'Collaboration with brands'],
                hashtags: ['#marketingmemes #agencyhumor', '#tips #quicktips', 'Trending marketing tags'],
                schedule: 'Post 1-2x daily. Focus on shareable formats.'
            }
        },
        creator: {
            leads: {
                pillars: ['Behind-the-scenes content creation', 'Monetization strategies and tips', 'Collaboration opportunities', 'Email list building content'],
                hashtags: ['#contentcreator #creator #influencer', '#monetization #strategy', 'Platform-specific creator tags'],
                schedule: 'Post when your audience is most active. Track analytics closely.'
            },
            sales: {
                pillars: ['Product and service launches', 'Affiliate marketing content', 'Sponsored content opportunities', 'Exclusive member content'],
                hashtags: ['#launch #newproduct #exclusive', '#affiliate #sponsored', 'Product-specific tags'],
                schedule: 'Launch sequences with countdown posts. Peak audience hours.'
            },
            brand: {
                pillars: ['Personal brand story', 'Content creation process', 'Values and mission content', 'Media kit and credentials'],
                hashtags: ['#personalbrand #brandstory', '#creator #process', 'Niche authority tags'],
                schedule: 'Post consistently at same times daily for algorithm optimization.'
            },
            engagement: {
                pillars: ['Audience polls and questions', 'Community challenges', 'Live streams and Q&As', 'Fan feature content'],
                hashtags: ['#community #engagement #interact', '#live #qanda', 'Challenge and trend tags'],
                schedule: 'High-frequency posting: 2-3x daily minimum.'
            },
            followers: {
                pillars: ['Trending content formats', 'Viral challenges participation', 'Collaboration with other creators', 'Platform-specific optimized content'],
                hashtags: ['#viral #trending #explore', '#challenge #trend', 'Platform discovery tags'],
                schedule: 'Post multiple times daily. Reels/TikToks for growth.'
            }
        },
        fitness: {
            leads: {
                pillars: ['Workout tutorials and demos', 'Nutrition tips and recipes', 'Transformation stories', 'Free workout plans'],
                hashtags: ['#fitness #workout #health', '#transformation #results', 'Goal-specific fitness tags'],
                schedule: 'Early morning (5-7AM) and evening (5-7PM) posts.'
            },
            sales: {
                pillars: ['Program and coaching offers', 'Supplement recommendations', 'Meal plan sales', 'Online coaching packages'],
                hashtags: ['#fitnesscoach #onlinecoaching', '#program #mealplan', 'Product and service tags'],
                schedule: 'Post after workout times when audience is motivated.'
            },
            brand: {
                pillars: ['Trainer credentials and story', 'Fitness philosophy and approach', 'Client success stories', 'Gym or studio features'],
                hashtags: ['#personaltrainer #coach #expert', '#philosophy #method', 'Certification tags'],
                schedule: 'Post 5-7x weekly. Consistency is key in fitness niche.'
            },
            engagement: {
                pillars: ['Daily workout challenges', 'Form check videos', 'Q&A on fitness topics', 'Community accountability posts'],
                hashtags: ['#challenge #workout #daily', '#formcheck #technique', 'Community fitness tags'],
                schedule: 'Morning motivation, afternoon tips, evening community posts.'
            },
            followers: {
                pillars: ['Quick workout videos', 'Before/after transformations', 'Trending fitness challenges', 'Motivational content'],
                hashtags: ['#fitnessmotivation #fitspo', '#transformation #beforeafter', 'Viral fitness tags'],
                schedule: 'Post 2-3x daily. Video content performs best.'
            }
        },
        realestate: {
            leads: {
                pillars: ['Property tours and listings', 'Market updates and insights', 'Home buying/selling tips', 'Neighborhood spotlights'],
                hashtags: ['#realestate #property #homes', '#marketupdate #realestatetips', 'Location-specific tags'],
                schedule: 'Post mid-morning and early evening when buyers browse.'
            },
            sales: {
                pillars: ['New listing announcements', 'Open house promotions', 'Sold celebrations', 'Buyer/seller consultations'],
                hashtags: ['#newlisting #openhouse #justsold', '#realtor #agent', 'MLS and property tags'],
                schedule: 'Thursday-Sunday focus for property viewing times.'
            },
            brand: {
                pillars: ['Agent expertise and awards', 'Client testimonials', 'Market knowledge content', 'Community involvement'],
                hashtags: ['#realestateagent #expert #topagent', '#testimonial #review', 'Brokerage tags'],
                schedule: 'Post 4-5x weekly. Video tours on weekends.'
            },
            engagement: {
                pillars: ['Home design trends', 'Mortgage and finance tips', 'First-time buyer guides', 'Property quizzes and polls'],
                hashtags: ['#homedesign #interiordesign', '#mortgage #firsttimebuyer', 'Trend and tip tags'],
                schedule: 'Daily posts mixing education and entertainment.'
            },
            followers: {
                pillars: ['Luxury property showcases', 'Before/after renovations', 'Real estate humor', 'Market predictions'],
                hashtags: ['#luxuryrealestate #dreamhome', '#renovation #beforeafter', 'Viral real estate tags'],
                schedule: 'Post 1-2x daily. Focus on visually stunning content.'
            }
        },
        finance: {
            leads: {
                pillars: ['Investment education content', 'Market analysis and updates', 'Financial planning tips', 'Free resources and tools'],
                hashtags: ['#finance #investing #wealth', '#marketanalysis #stocks', 'Educational finance tags'],
                schedule: 'Post during market hours and evening education times.'
            },
            sales: {
                pillars: ['Service package details', 'Portfolio performance', 'Consultation bookings', 'Course and product launches'],
                hashtags: ['#financialadvisor #wealthmanagement', '#portfolio #returns', 'Service-specific tags'],
                schedule: 'Post when markets close for maximum attention.'
            },
            brand: {
                pillars: ['Expertise and credentials', 'Market predictions', 'Client success stories', 'Media appearances'],
                hashtags: ['#financialexpert #advisor', '#marketprediction #analysis', 'Credential and media tags'],
                schedule: 'Post 3-4x weekly. Long-form content on weekends.'
            },
            engagement: {
                pillars: ['Daily market updates', 'Investment Q&As', 'Financial literacy content', 'Community discussions'],
                hashtags: ['#marketupdate #dailymarket', '#financialliteracy #education', 'Discussion tags'],
                schedule: 'Morning market updates, evening educational content.'
            },
            followers: {
                pillars: ['Crypto and trending topics', 'Money mindset content', 'Quick finance tips', 'Market memes'],
                hashtags: ['#crypto #bitcoin #trending', '#moneymindset #wealth', 'Viral finance tags'],
                schedule: 'Post 1-2x daily. Capitalize on trending topics.'
            }
        }
    };
    
    if (aiToolForm) {
        aiToolForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const industry = document.getElementById('industry').value;
            const goal = document.getElementById('goal').value;
            const audience = document.getElementById('audience').value;
            
            if (!industry || !goal || !audience) return;
            
            generateStrategy(industry, goal, audience);
        });
    }
    
    function generateStrategy(industry, goal, audience) {
        const strategy = strategies[industry]?.[goal] || strategies.coaching.leads;
        
        strategyOutput.innerHTML = '<div class="typing-animation">Generating your personalized strategy...</div>';
        
        setTimeout(() => {
            const strategyHTML = `
                <div class="strategy-result">
                    <h3>📊 Content Pillars</h3>
                    <ul>
                        ${strategy.pillars.map(pillar => `<li>${pillar}</li>`).join('')}
                    </ul>
                    
                    <h3>🏷️ Hashtag Strategy</h3>
                    <ul>
                        ${strategy.hashtags.map(tag => `<li>${tag}</li>`).join('')}
                    </ul>
                    
                    <h3>📅 Posting Schedule</h3>
                    <ul>
                        <li>${strategy.schedule}</li>
                        <li>Target Audience: ${audience}</li>
                        <li>Engagement windows: Track your analytics for peak times</li>
                    </ul>
                    
                    <h3>🚀 AI Automation Tips</h3>
                    <ul>
                        <li>Use ChatGPT to generate 30 days of content ideas</li>
                        <li>Automate hashtag research with AI tools</li>
                        <li>Create content templates for consistent branding</li>
                        <li>Set up chatbot responses for common DMs</li>
                    </ul>
                </div>
            `;
            
            strategyOutput.innerHTML = strategyHTML;
            emailCapture.style.display = 'block';
            
            strategyOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 2000);
    }
    
    if (strategyCaptureForm) {
        strategyCaptureForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('strategyEmail').value;
            
            if (!email) return;
            
            const strategyText = strategyOutput.innerText;
            const blob = new Blob([strategyText], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'instagram-strategy.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            strategyCaptureForm.innerHTML = '<p style="color: #10B981;">✓ Strategy saved! Check your downloads.</p>';
            
            console.log('Email captured:', email);
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.glass-card, .stat, .hero-badge');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const cards = document.querySelectorAll('.glass-card, .service-card-full');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

});