import React from 'react'

const VideoHero = () => {
    return (
        <section className="video-hero">
            <div className="video-background">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="background-video"
                >
                    <source src="https://res.cloudinary.com/dlddbdmqy/video/upload/v1771870308/5846305-hd_1920_1080_25fps_wztlua.mp4" type="video/mp4" />
                </video>
                <div className="video-overlay"></div>
            </div>
            <div className="video-hero-content">
                <img
                    src="/Logo.png"
                    alt="Anwar Ispat Logo"
                    style={{
                        marginBottom: '2.5rem',
                        height: 'clamp(100px, 25vh, 200px)',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 0 35px rgba(227, 24, 45, 0.8))'
                    }}
                />
                <h1 className="video-hero-title">
                    SHAPING THE <span className="accent-text">FUTURE</span>
                </h1>
                <p className="video-hero-subtitle" style={{ marginTop: '1.5rem', maxWidth: '600px', color: 'var(--subtext)', fontSize: '1.2rem' }}>
                    Unrelenting strength. Uncompromising quality. The structural backbone of tomorrow's infrastructure.
                </p>
            </div>
        </section>
    )
}

export default VideoHero
