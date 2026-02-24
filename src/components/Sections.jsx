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

const MediaHoverCard = ({ date, title, desc, img }) => {
    return (
        <div
            style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                transformStyle: 'preserve-3d'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                e.currentTarget.style.borderColor = 'rgba(227, 24, 45, 0.5)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(227, 24, 45, 0.15)';
                e.currentTarget.querySelector('.media-img').style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                e.currentTarget.querySelector('.media-img').style.transform = 'scale(1)';
            }}
        >
            <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                <img className="media-img" src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} />
            </div>
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '0.8rem', fontWeight: '700', letterSpacing: '0.1em' }}>{date}</p>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1rem', color: '#fff', lineHeight: '1.3' }}>{title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--subtext)', lineHeight: '1.6', marginTop: 'auto' }}>{desc}</p>
            </div>
        </div>
    );
};

export const MediaEvents = () => (
    <section id="media-events" style={{
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(11, 11, 11, 0.85)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        position: 'relative',
        zIndex: 10,
        padding: '6rem 5%'
    }}>
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem' }}>
                <div style={{ textAlign: 'left', maxWidth: '600px' }}>
                    <h2 className="accent-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>MEDIA & EVENTS</h2>
                    <p style={{ color: 'var(--subtext)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Stay updated with our latest milestones, announcements, and structural innovations. We continually redefine industry standards across the nation.
                    </p>
                </div>
                <a href="#all-events" className="magnetic-btn" style={{ fontSize: '0.9rem', padding: '1rem 2rem', marginTop: 0 }}>VIEW ALL ARCHIVES</a>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                perspective: '1000px'
            }}>
                <MediaHoverCard
                    date="24 FEB 2026"
                    title="Anwar Ispat Unveils New High-Grade Steel Standard"
                    desc="Setting unprecedented structural benchmarks with our newly patented 500W TMT multi-core rebars."
                    img="https://images.unsplash.com/photo-1541888053158-b6fe071d3714?auto=format&fit=crop&q=80&w=600"
                />
                <MediaHoverCard
                    date="15 JAN 2026"
                    title="Annual Dealers Synergy Meet 2026"
                    desc="A grand gathering of our finest partners sharing insights on scaling national mega-infrastructure."
                    img="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600"
                />
                <MediaHoverCard
                    date="05 DEC 2025"
                    title="Green Factory Certification Awarded"
                    desc="Recognized for exceptional commitment to reducing carbon footprints via advanced blast furnace technologies."
                    img="https://images.unsplash.com/photo-1520699918507-3c3e05c46b0c?auto=format&fit=crop&q=80&w=600"
                />
            </div>
        </div>
    </section>
)

const BlogFeatureCard = ({ category, title, readTime, img, delay }) => {
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

        card.style.transform = `perspective(1200px) rotateX(${xRotate}deg) rotateY(${yRotate}deg) translateY(-10px) scale(1.02)`;
        card.style.transition = 'none';
        card.style.borderColor = 'rgba(227, 24, 45, 0.4)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(227, 24, 45, 0.15)';
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
        card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                background: `linear-gradient(rgba(11, 11, 11, 0.3), rgba(11, 11, 11, 0.9)), url(${img}) center/cover`,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2.5rem',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                transformStyle: 'preserve-3d',
                overflow: 'hidden',
                animation: `fadeInUp 0.8s ease backwards ${delay}s`
            }}
        >
            <div style={{ transform: 'translateZ(40px)', position: 'relative', zIndex: 2 }}>
                <span style={{
                    display: 'inline-block',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-heading)',
                    backgroundColor: 'rgba(227, 24, 45, 0.9)',
                    color: '#fff',
                    padding: '0.4rem 1rem',
                    borderRadius: '4px',
                    letterSpacing: '0.1em',
                    marginBottom: '1rem',
                    textTransform: 'uppercase'
                }}>
                    {category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1rem', color: '#fff', lineHeight: '1.2' }}>
                    {title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--subtext)', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        {readTime}
                    </span>
                    <span style={{ width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%' }}></span>
                    <span>Read Article</span>
                </div>
            </div>
            {/* Dark overlay for contrast */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', zIndex: 1 }}></div>
        </div>
    );
};

export const Blog = () => {
    return (
        <section id="blog" style={{
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(5, 5, 5, 0.8)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            position: 'relative',
            zIndex: 10,
            padding: '8rem 5% 6rem'
        }}>
            <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h2 className="accent-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1rem', lineHeight: '1' }}>
                        INSIGHTS &<br />INNOVATIONS
                    </h2>
                    <p style={{ color: 'var(--subtext)', fontSize: '1.15rem', lineHeight: '1.6', marginTop: '1.5rem' }}>
                        Explore the engineering philosophies, metallurgical advancements, and stories behind the massive infrastructures shaping the country.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2.5rem',
                    perspective: '1200px'
                }}>
                    <BlogFeatureCard
                        category="Engineering"
                        title="The Science Behind 500W TMT Rebars: A Deep Dive"
                        readTime="6 min read"
                        img="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=800"
                        delay={0.1}
                    />
                    <BlogFeatureCard
                        category="Sustainability"
                        title="Achieving Net-Zero Emissions in Blast Furnace Operations"
                        readTime="8 min read"
                        img="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
                        delay={0.3}
                    />
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <a href="#blog-archive" className="magnetic-btn" style={{ fontSize: '1rem', padding: '1.2rem 3rem' }}>
                        BROWSE ALL ARTICLES
                    </a>
                </div>
            </div>

            {/* Inline CSS animation for fade in */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
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
