import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const products = [
    {
        id: 1,
        title: "500W Rebar (TMT)",
        desc: "High-tensile, thermo-mechanically treated rebars designed with supreme atomic precision.",
        img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=500"
    },
    {
        id: 2,
        title: "60 Grade Rebar",
        desc: "Unmatched yield strength ensuring durability for extreme load-bearing superstructures.",
        img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=500"
    },
    {
        id: 3,
        title: "Billet Solutions",
        desc: "Raw, customized billet ingots casted perfectly to serve customized structural needs.",
        img: "https://images.unsplash.com/photo-1620021307524-aa6120efbfec?auto=format&fit=crop&q=80&w=500"
    }
];

export const ProductService = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    return (
        <section id="product-service" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center', padding: '0 5%', paddingTop: '80px' }}>
            <div style={{ textAlign: 'center', zIndex: 10, position: 'relative', width: '100%', maxWidth: '1200px' }}>
                <h2 className="accent-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>PRODUCT & SERVICE</h2>
                <p style={{ color: 'var(--subtext)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
                    Forged in extreme intensity. We provide exceptional structural solutions designed to act as the unyielding backbone of tomorrow's infrastructure.
                </p>

                <div className="carousel-container">
                    {products.map((product, index) => {
                        let offset = index - activeIndex;
                        if (offset < -1) offset += products.length;
                        if (offset > 1) offset -= products.length;

                        let style = {};
                        if (offset === 0) {
                            style = { transform: 'translateX(0) scale(1) translateZ(50px)', zIndex: 3, opacity: 1 };
                        } else if (offset === 1) {
                            style = { transform: 'translateX(60%) scale(0.8) translateZ(0) rotateY(-15deg)', zIndex: 2, opacity: 0.6 };
                        } else if (offset === -1) {
                            style = { transform: 'translateX(-60%) scale(0.8) translateZ(0) rotateY(15deg)', zIndex: 2, opacity: 0.6 };
                        } else {
                            style = { transform: 'translateX(0) scale(0.5) translateZ(-100px)', zIndex: 1, opacity: 0 };
                        }

                        return (
                            <div key={product.id} className="carousel-card" style={style} onClick={() => setActiveIndex(index)}>
                                <img src={product.img} alt={product.title} className="carousel-img" />
                                <div className="carousel-content">
                                    <h3 className="carousel-title">{product.title}</h3>
                                    <p className="carousel-desc">{product.desc}</p>
                                </div>
                            </div>
                        );
                    })}

                    <div className="carousel-nav">
                        <button className="carousel-btn" onClick={prevSlide}><ChevronLeft size={24} /></button>
                        <button className="carousel-btn" onClick={nextSlide}><ChevronRight size={24} /></button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const BlueprintRow = ({ number, title, desc, specs }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2rem 1rem',
                cursor: 'crosshair',
                transition: 'all 0.4s ease',
                position: 'relative',
                background: isHovered ? 'rgba(227, 24, 45, 0.05)' : 'transparent'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <span style={{
                    fontFamily: 'monospace',
                    color: isHovered ? 'var(--accent)' : 'var(--subtext)',
                    fontSize: '1.2rem',
                    transition: 'color 0.4s ease'
                }}>
                    [{number}]
                </span>
                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: isHovered ? '#fff' : 'rgba(255,255,255,0.7)',
                    transition: 'color 0.4s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    margin: 0
                }}>{title}</h3>
                <div style={{ flex: 1, minWidth: '20px' }}></div>
                <span style={{
                    color: isHovered ? 'var(--accent)' : 'var(--subtext)',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    transition: 'all 0.4s ease',
                    opacity: isHovered ? 1 : 0.5
                }}>
                    {isHovered ? 'EXPANDED' : 'HOVER TO EXPAND +'}
                </span>
            </div>

            <div style={{
                maxHeight: isHovered ? '400px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
                paddingLeft: '3.5rem'
            }}>
                <div style={{ paddingTop: '1.5rem', display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                    <p style={{ color: 'var(--subtext)', flex: '1 1 400px', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>
                        {desc}
                    </p>
                    <div style={{ flex: '1 1 200px', borderLeft: '1px solid rgba(227, 24, 45, 0.3)', paddingLeft: '1.5rem' }}>
                        <ul style={{ listStyle: 'none', color: '#fff', fontSize: '0.85rem', lineHeight: '2.5', fontFamily: 'monospace' }}>
                            {specs.map((spec, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--accent)' }}>▹</span> {spec}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const BetterTomorrow = () => (
    <section id="better-tomorrow" style={{
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(11, 11, 11, 0.7)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        backgroundImage: `
            linear-gradient(rgba(227, 24, 45, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(227, 24, 45, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        zIndex: 10,
        padding: '8rem 5%'
    }}>
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, transparent 0%, rgba(11,11,11,0.95) 80%)',
            pointerEvents: 'none',
            zIndex: 1
        }}></div>

        <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '4rem', position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2.5rem' }}>
                <p style={{ fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: '1rem', fontSize: '0.9rem' }}>// INIT_SEQUENCE: SUSTAINABILITY</p>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', color: '#fff', lineHeight: 1.1 }}>A BETTER TOMORROW</h2>
                <p style={{ color: 'var(--subtext)', maxWidth: '700px', fontSize: '1.15rem', lineHeight: '1.6' }}>
                    Building Bangladesh is an exact science.
                    We engineer resilience to empower mega infrastructure, high-rises, and iconic structural marvels across the nation.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <BlueprintRow
                    number="01"
                    title="Sustainable Core"
                    desc="We utilize advanced emission-control technology in our blast furnaces. The chemical composition is strictly monitored to drastically reduce our carbon footprint while simultaneously increasing tensile efficiency."
                    specs={['EMISSION: -40%', 'YIELD: 500W', 'TEMP: 1600°C', 'STATUS: OPTIMAL']}
                />
                <BlueprintRow
                    number="02"
                    title="Seismic Resilience"
                    desc="Our 500W TMT rebars undergo rigorous cyclic loading tests. They are specifically engineered to flex and absorb kinetic energy, ensuring high-rises withstand extreme seismic activity."
                    specs={['FLEXURAL_STRENGTH: HIGH', 'BENDABILITY: OPTIMAL', 'DUCTILITY: SUPERIOR', 'TEST: PASSED']}
                />
                <BlueprintRow
                    number="03"
                    title="Economic Foundation"
                    desc="By producing super-grade steel locally, we reduce import dependency. We are proud to act as the structural and economic backbone of national mega-projects serving millions daily."
                    specs={['LOCAL_PROD: 100%', 'SCALE: MASSIVE', 'IMPACT: NATIONAL', 'GROWTH: POSITIVE']}
                />
            </div>
        </div>
    </section>
)

const ForgeCard = ({ role, type, desc }) => {
    const cardRef = useRef();

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const multiplier = 10;
        const xRotate = multiplier * (y / (rect.height / 2));
        const yRotate = -multiplier * (x / (rect.width / 2));

        card.style.transform = `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg) scale(1.03)`;
        card.style.transition = 'none';
        card.style.background = 'linear-gradient(135deg, rgba(30,30,30,0.9), rgba(10,10,10,0.95))';
        card.style.borderColor = 'rgba(255, 60, 0, 0.8)'; // Intense glowing orange/red
        card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 60, 0, 0.3), inset 0 0 20px rgba(255, 60, 0, 0.1)';

        const title = card.querySelector('.forge-title');
        if (title) {
            title.style.color = '#fff';
            title.style.textShadow = '0 0 10px rgba(255, 100, 0, 0.8)';
        }
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        card.style.transition = 'all 0.5s ease-out';
        card.style.background = 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(5,5,5,0.95))';
        card.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';

        const title = card.querySelector('.forge-title');
        if (title) {
            title.style.color = 'rgba(255,255,255,0.7)';
            title.style.textShadow = 'none';
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(5,5,5,0.95))',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '2.5rem',
                cursor: 'pointer',
                transition: 'all 0.5s ease-out',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
                width: '100%',
                willChange: 'transform',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Subtle noise texture overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                opacity: 0.04, mixBlendMode: 'overlay', pointerEvents: 'none'
            }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <h3 className="forge-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'rgba(255,255,255,0.7)', transition: 'all 0.4s ease', margin: 0 }}>
                        {role}
                    </h3>
                    <span style={{
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        color: 'var(--accent)',
                        border: '1px solid rgba(227, 24, 45, 0.3)',
                        padding: '0.3rem 0.8rem',
                        letterSpacing: '0.1em',
                        whiteSpace: 'nowrap'
                    }}>{type}</span>
                </div>
                <p style={{ color: 'var(--subtext)', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>{desc}</p>
            </div>
        </div>
    );
};

export const Career = () => (
    <section id="career" style={{
        minHeight: '100vh',
        justifyContent: 'center',
        background: 'rgba(11, 11, 11, 0.7)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        borderTop: '1px solid rgba(255, 60, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 60, 0, 0.1)',
        position: 'relative',
        zIndex: 10,
        padding: '8rem 5%',
        overflow: 'hidden'
    }}>
        {/* Ambient background glow */}
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            height: '80vh',
            background: 'radial-gradient(circle, rgba(227, 24, 45, 0.05) 0%, transparent 60%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 1
        }}></div>

        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                <p style={{ fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '1rem', fontSize: '0.9rem', borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
                    JOIN THE FORGE
                </p>
                <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', color: '#fff', lineHeight: 1, textTransform: 'uppercase' }}>
                    IGNITE<br />YOUR<br />POTENTIAL
                </h2>
                <p style={{ color: 'var(--subtext)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '400px' }}>
                    We are forging the structural backbone of tomorrow. We seek relentless individuals ready to operate at absolute peak intensity across our corporate and metallurgical divisions.
                </p>
                <a href="#apply" className="magnetic-btn" style={{ fontSize: '0.9rem', padding: '1rem 2.5rem', marginTop: '0', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    ENTER THE FORGE
                </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', perspective: '1200px' }}>
                <ForgeCard
                    role="Metallurgical Engineer"
                    type="FULL-TIME"
                    desc="Oversee our blast furnace operations, ensuring temperature and alloy compositions meet world-class industry benchmarks directly on the production floor."
                />
                <ForgeCard
                    role="Structural QA Specialist"
                    type="CONTRACT"
                    desc="Run extensive tensile and stress tests on the 500W TMT rebars. Demand perfection before any steel leaves our testing facility."
                />
                <ForgeCard
                    role="Supply Chain Director"
                    type="FULL-TIME"
                    desc="Manage nation-wide heavy logistics, coordinating the shipment of raw billets and forged rebars to monumental structural projects."
                />
            </div>
        </div>
    </section>
)

const BroadcastCard = ({ date, title, desc, img, isHovering, onHover }) => {
    return (
        <div
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderLeft: '4px solid rgba(255, 255, 255, 0.1)',
                padding: '1.5rem',
                minWidth: '400px',
                height: '140px',
                width: '100%',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                transform: 'translateZ(0)',
                willChange: 'transform, border-color, box-shadow',
                position: 'relative',
                overflow: 'hidden'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateZ(20px)';
                e.currentTarget.style.borderLeftColor = 'var(--accent)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(227, 24, 45, 0.1)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateZ(0)';
                e.currentTarget.style.borderLeftColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <div style={{ flex: '0 0 100px', height: '100%', marginRight: '1.5rem', overflow: 'hidden', borderRadius: '4px' }}>
                <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.8)', transition: 'filter 0.4s' }}
                    onMouseOver={(e) => e.currentTarget.style.filter = 'grayscale(0)'}
                    onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(0.8)'}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.5rem', fontFamily: 'monospace', letterSpacing: '0.1em' }}><span style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%', marginRight: '5px', animation: 'blink 2s infinite' }}></span> {date}</p>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--subtext)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{desc}</p>
            </div>

            <style jsx>{`
                @keyframes blink {
                    0% { opacity: 1; }
                    50% { opacity: 0.3; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export const MediaEvents = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Duplicate data to create a seamless loop
    const broadcastData = [
        {
            date: "24 FEB 2026 - LIVE",
            title: "Unveiling New High-Grade Steel Standard",
            desc: "Setting unprecedented structural benchmarks with 500W TMT.",
            img: "https://images.unsplash.com/photo-1541888053158-b6fe071d3714?auto=format&fit=crop&q=80&w=600"
        },
        {
            date: "15 JAN 2026 - ARCHIVE",
            title: "Annual Dealers Synergy Meet 2026",
            desc: "A grand gathering of our finest national partners.",
            img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600"
        },
        {
            date: "05 DEC 2025 - INTL",
            title: "Green Factory Certification Awarded",
            desc: "Recognized for commitment to reducing carbon footprints.",
            img: "https://images.unsplash.com/photo-1520699918507-3c3e05c46b0c?auto=format&fit=crop&q=80&w=600"
        },
        {
            date: "12 NOV 2025 - LOCAL",
            title: "Mega-Bridge Foundations Secured",
            desc: "Anwar Ispat selected as primary supplier for the central bridge project.",
            img: "https://images.unsplash.com/photo-1545532594-918cecebb08b?auto=format&fit=crop&q=80&w=600"
        }
    ];

    return (
        <section id="media-events" style={{
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(11, 11, 11, 0.7)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            position: 'relative',
            zIndex: 10,
            overflow: 'hidden',
            padding: '4rem 5%'
        }}>
            {/* Background elements to enhance the broadcast room feel */}
            <div style={{ position: 'absolute', top: 0, left: '10%', width: '1px', height: '100%', background: 'rgba(255,255,255,0.05)' }}></div>
            <div style={{ position: 'absolute', top: 0, right: '10%', width: '1px', height: '100%', background: 'rgba(255,255,255,0.05)' }}></div>

            <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', height: '100%' }}>

                {/* Left side text content */}
                <div style={{ flex: '1 1 400px', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <span style={{ display: 'inline-block', width: '12px', height: '12px', background: 'var(--accent)', borderRadius: '50%', animation: 'blink 2s infinite' }}></span>
                        <p style={{ fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.2em', fontSize: '0.9rem', margin: 0 }}>NEWS DESK</p>
                    </div>
                    <h2 className="accent-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1.5rem', lineHeight: '0.9' }}>MEDIA &<br />EVENTS</h2>
                    <p style={{ color: 'var(--subtext)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                        Constant motion. Constant innovation. Tap into our live broadcasting feed to stay updated with structural advancements across the nation.
                    </p>
                    <a href="#all-events" className="magnetic-btn" style={{ fontSize: '0.85rem', padding: '1rem 2rem', marginTop: 0, background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)' }}>ACCESS FULL TERMINAL</a>
                </div>

                {/* Right side Marquee Scroller */}
                <div style={{
                    flex: '1 1 500px',
                    height: '80vh',
                    position: 'relative',
                    perspective: '1000px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {/* Top and bottom fade masks for the scrolling effect */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to bottom, rgba(11,11,11,1), transparent)', zIndex: 5, pointerEvents: 'none' }}></div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to top, rgba(11,11,11,1), transparent)', zIndex: 5, pointerEvents: 'none' }}></div>

                    <div
                        className="broadcast-marquee"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            transformStyle: 'preserve-3d',
                            animation: isHovered ? 'none' : 'scrollUp 25s linear infinite',
                            animationPlayState: isHovered ? 'paused' : 'running',
                            transform: 'rotateY(-15deg) rotateX(5deg)' // Angled perspective
                        }}
                    >
                        {/* We map the data twice to create the infinite loop effect seamlessly */}
                        {[...broadcastData, ...broadcastData, ...broadcastData].map((event, index) => (
                            <BroadcastCard
                                key={index}
                                {...event}
                                onHover={setIsHovered}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scrollUp {
                    0% { transform: rotateY(-15deg) rotateX(5deg) translateY(0); }
                    100% { transform: rotateY(-15deg) rotateX(5deg) translateY(-50%); } 
                }
            `}</style>
        </section>
    );
};

const DataMatrixCard = ({ category, title, impact, readTime, img }) => {
    const cardRef = useRef();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const multiplier = 5;
        const xRotate = multiplier * (y / (rect.height / 2));
        const yRotate = -multiplier * (x / (rect.width / 2));

        card.style.transform = `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg) scale(1.02)`;
        card.style.transition = 'none';
        card.style.borderColor = 'rgba(227, 24, 45, 0.4)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(227, 24, 45, 0.1)';

        const overlay = document.getElementById(`overlay-${title.replace(/\\s+/g, '')}`);
        if (overlay) overlay.style.opacity = '0.9';
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        card.style.transition = 'all 0.4s ease-out';
        card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        card.style.boxShadow = 'none';

        const overlay = document.getElementById(`overlay-${title.replace(/\\s+/g, '')}`);
        if (overlay) overlay.style.opacity = '0.5';
        setIsHovered(false);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{
                position: 'relative',
                background: '#0B0B0B',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                minHeight: '420px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'crosshair',
                transition: 'all 0.4s ease-out',
                overflow: 'hidden',
                padding: '2.5rem'
            }}
        >
            {/* Background image with color burn for a technical feel */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%) contrast(120%) brightness(40%)', zIndex: 0 }}></div>

            {/* Dark Matrix Overlay */}
            <div id={`overlay-${title.replace(/\\s+/g, '')}`} style={{
                position: 'absolute', inset: 0,
                backgroundColor: 'rgba(11,11,11,0.5)',
                backgroundImage: 'linear-gradient(rgba(227, 24, 45, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 24, 45, 0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                zIndex: 1, transition: 'opacity 0.4s ease'
            }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                <span style={{
                    display: 'inline-block',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    color: isHovered ? '#fff' : 'var(--accent)',
                    padding: '0.3rem 0',
                    letterSpacing: '0.15em',
                    borderBottom: '1px solid rgba(227,24,45,0.5)',
                    textTransform: 'uppercase',
                    transition: 'all 0.4s ease'
                }}>
                    [ {category} ]
                </span>

                {/* Data metrics that appear on hover */}
                <div style={{
                    display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end',
                    opacity: isHovered ? 1 : 0, transition: 'opacity 0.4s ease',
                    fontFamily: 'monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)'
                }}>
                    <span>IMPACT: <span style={{ color: 'var(--accent)' }}>{impact}</span></span>
                    <span>READ_TIME: <span style={{ color: '#fff' }}>{readTime}</span></span>
                    <span>ACCESS: <span style={{ color: '#0f0' }}>GRANTED</span></span>
                </div>
            </div>

            <div style={{ position: 'relative', zIndex: 2, transform: isHovered ? 'translateY(0)' : 'translateY(20px)', transition: 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)' }}>
                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    marginBottom: '1.5rem',
                    color: '#fff',
                    lineHeight: '1.2',
                    textShadow: isHovered ? '0 0 15px rgba(227,24,45,0.3)' : 'none',
                    transition: 'text-shadow 0.4s'
                }}>
                    {title}
                </h3>

                <div style={{
                    height: isHovered ? '24px' : '0px',
                    overflow: 'hidden',
                    transition: 'height 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    color: 'var(--accent)', fontSize: '0.85rem', fontFamily: 'monospace'
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                        INITIATE DATA TRANSFER
                    </span>
                </div>
            </div>
        </div>
    );
};

export const Blog = () => {
    return (
        <section id="blog" style={{
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(11, 11, 11, 0.7)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative',
            zIndex: 10,
            padding: '8rem 5% 6rem'
        }}>
            <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
                    <div style={{ textAlign: 'left', maxWidth: '800px' }}>
                        <p style={{ fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: '1rem', fontSize: '0.9rem' }}>// KNOWLEDGE_BASE_v2.0</p>
                        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', marginBottom: '1.5rem', lineHeight: '1', color: '#fff', textTransform: 'uppercase' }}>
                            INSIGHTS &<br />INNOVATIONS
                        </h2>
                        <p style={{ color: 'var(--subtext)', fontSize: '1.15rem', lineHeight: '1.7', maxWidth: '600px' }}>
                            Access our architectural database. Explore exact engineering philosophies, heavily researched metallurgical leaps, and the cold calculations behind mass infrastructure.
                        </p>
                    </div>
                    <a href="#blog-archive" className="magnetic-btn" style={{ fontSize: '0.85rem', padding: '1.2rem 2.5rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', letterSpacing: '0.1em' }}>
                        ACCESS ALL FILES
                    </a>
                </div>

                {/* Dense Masonry Grid for the technical feel */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '1px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <DataMatrixCard
                        category="Metallurgy"
                        impact="CRITICAL"
                        readTime="06_MIN"
                        title="The Exact Science Behind 500W TMT Rebars: A Load-Bearing Analysis"
                        img="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=800"
                    />
                    <DataMatrixCard
                        category="Sustainability"
                        impact="HIGH"
                        readTime="08_MIN"
                        title="Achieving Absolute Zero: Eliminating Emissions in Active Blast Furnaces"
                        img="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
                    />
                    <DataMatrixCard
                        category="Architecture"
                        impact="MODERATE"
                        readTime="04_MIN"
                        title="Kinetic Flexibility: Engineering Skyscrapers for Maximum Seismic Resilience"
                        img="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                    />
                </div>
            </div>
        </section>
    );
};

export const Footer = ({ onOpenContact }) => (
    <footer style={{
        width: '100%',
        padding: '4rem 10% 2rem 10%',
        backgroundColor: 'var(--primary)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        zIndex: 10
    }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <img src="/Logo.png" alt="Anwar Ispat Logo" style={{ height: 'clamp(50px, 8vw, 80px)', objectFit: 'contain', objectPosition: 'left', marginBottom: '1.5rem', filter: 'grayscale(100%) brightness(200%)' }} />
                <p style={{ color: 'var(--subtext)', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '300px' }}>
                    Unrelenting strength. Uncompromising quality. The structural backbone of tomorrow's infrastructure.
                </p>
                <button onClick={onOpenContact} className="magnetic-btn" style={{ fontSize: '0.8rem', padding: '0.8rem 1.5rem' }}>
                    CONTACT US
                </button>
            </div>

            <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>QUICK LINKS</h4>
                    <a href="#product-service" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}>Product & Service</a>
                    <a href="#better-tomorrow" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}>Better Tomorrow</a>
                    <a href="#career" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}>Career</a>
                    <a href="#media-events" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}>Media & Events</a>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>LEGAL</h4>
                    <a href="#" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}>Privacy Policy</a>
                    <a href="#" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}>Terms of Service</a>
                </div>
            </div>
        </div>

        <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
        }}>
            <p style={{ color: 'var(--subtext)', fontSize: '0.8rem' }}>&copy; {new Date().getFullYear()} Anwar Ispat. All Rights Reserved.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '0.8rem' }}>Facebook</a>
                <a href="#" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '0.8rem' }}>LinkedIn</a>
                <a href="#" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '0.8rem' }}>Twitter</a>
            </div>
        </div>
    </footer>
)
