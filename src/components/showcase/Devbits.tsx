'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import ParticleText from '../components/showcase/ParticleText';
import ScrollVelocity from '../components/showcase/ScrollVelocity';

gsap.registerPlugin(ScrollTrigger, SplitText);

export interface TagItem {
  id?: string;
  text: string;
  background: string;
  color?: string;
}

export interface HeroScrollVideoRevealProps {
  topText?: React.ReactNode;
  headingText?: React.ReactNode;
  tags?: TagItem[];
  subText?: string;
  videoSrc?: string;
  bottomText?: React.ReactNode;
  badgeImgSrc?: string;
  className?: string;
}

const DEFAULT_TAGS: TagItem[] = [
  { text: 'Quiet peaks', background: '#1B211A', color: '#ffffff' },
  { text: 'Pure air energy', background: '#628141', color: '#ffffff' },
  { text: 'Endlessly renewable', background: '#EBD5AB', color: '#444444' },
  { text: 'Clean as alpine snow', background: '#2F5755', color: '#ffffff' },
];

export const Devbits: React.FC<HeroScrollVideoRevealProps> = ({
  topText = (
    <>
      Built to flow with your story,
      <br />
      not fight it
    </>
  ),
  headingText = (
    <>
      Step into mountain calm <br />
      Nature tells the story.
    </>
  ),
  tags = DEFAULT_TAGS,
  subText = 'And the journey continues beyond the summit...',
  videoSrc = 'https://res.cloudinary.com/ulgfi6yl/video/upload/v1788321431/856381-hd_1920_1080_30fps.mp4',
  bottomText = (
    <>
      Where every scroll feels
      <br />
      intentional
    </>
  ),
  badgeImgSrc = 'https://cdn.21st.dev/assets/mirror/23/23a474e4cceeaf6b98729302d689998195e5534241cbc33ee2c64dfc351c16d6.png',
  className = '',
}) => {
  const benefitRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const tagRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Ensure video plays smoothly
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }

    // Optional Lenis smooth scroll
    let lenis: any = null;
    let lenisTicker: ((time: number) => void) | null = null;

    import('@studio-freight/lenis')
      .then(({ default: Lenis }) => {
        lenis = new Lenis({ smooth: true });
        lenis.on('scroll', ScrollTrigger.update);
        lenisTicker = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(lenisTicker);
        gsap.ticker.lagSmoothing(0);
      })
      .catch(() => {});

    // Word split kinetic reveal animation
    let split: any = null;
    let words: Element[] = [];

    try {
      split = new SplitText(paraRef.current, {
        type: 'words',
        wordsClass: 'reveal-word inline-block origin-left mr-[0.25em] will-change-transform',
      });
      words = split.words;
    } catch {
      if (paraRef.current) {
        words = Array.from(paraRef.current.querySelectorAll('.reveal-word'));
      }
    }

    if (words && words.length > 0) {
      gsap.set(words, { opacity: 0, rotate: 8, yPercent: 30 });
    }

    // Reveal timeline for headline & tag badges
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: benefitRef.current,
        start: 'top 70%',
        end: 'top -10%',
        scrub: 1.5,
      },
    });

    if (words && words.length > 0) {
      revealTl.to(words, {
        stagger: 0.2,
        opacity: 1,
        rotate: 0,
        yPercent: 0,
        ease: 'power1.inOut',
      });
    }

    tagRefs.current.forEach((tagEl) => {
      if (tagEl) {
        revealTl.to(
          tagEl,
          {
            duration: 1,
            opacity: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'circ.out',
          },
          '>-0.4'
        );
      }
    });

    // ── Responsive MatchMedia for Small, Mid, and Large screens ─────────────
    const mm = gsap.matchMedia();

    // 1. Small Screens (Mobile < 640px)
    mm.add('(max-width: 639.9px)', () => {
      gsap.set(videoBoxRef.current, { clipPath: 'circle(18% at 50% 50%)' });

      const vpTl = gsap.timeline({
        scrollTrigger: {
          trigger: videoWrapperRef.current,
          start: 'top top',
          end: '+=1500',
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onRefresh: (self) => {
            if (self.spacer) self.spacer.style.backgroundColor = '#0d0f0d';
            if (self.pin) self.pin.style.backgroundColor = '#0d0f0d';
          },
          onToggle: (self) => {
            if (self.spacer) self.spacer.style.backgroundColor = '#0d0f0d';
            if (self.pin) self.pin.style.backgroundColor = '#0d0f0d';
          },
        },
      });

      vpTl.fromTo(
        videoBoxRef.current,
        { clipPath: 'circle(18% at 50% 50%)' },
        { clipPath: 'circle(150% at 50% 50%)', ease: 'none' }
      );
    });

    // 2. Mid Screens (Tablets / Phablets 640px - 1023.9px)
    mm.add('(min-width: 640px) and (max-width: 1023.9px)', () => {
      gsap.set(videoBoxRef.current, { clipPath: 'circle(12% at 50% 50%)' });

      const vpTl = gsap.timeline({
        scrollTrigger: {
          trigger: videoWrapperRef.current,
          start: 'top top',
          end: '+=2000',
          scrub: 1.3,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onRefresh: (self) => {
            if (self.spacer) self.spacer.style.backgroundColor = '#0d0f0d';
            if (self.pin) self.pin.style.backgroundColor = '#0d0f0d';
          },
          onToggle: (self) => {
            if (self.spacer) self.spacer.style.backgroundColor = '#0d0f0d';
            if (self.pin) self.pin.style.backgroundColor = '#0d0f0d';
          },
        },
      });

      vpTl.fromTo(
        videoBoxRef.current,
        { clipPath: 'circle(12% at 50% 50%)' },
        { clipPath: 'circle(150% at 50% 50%)', ease: 'none' }
      );
    });

    // 3. Large Screens (Desktop >= 1024px)
    mm.add('(min-width: 1024px)', () => {
      gsap.set(videoBoxRef.current, { clipPath: 'circle(8% at 50% 50%)' });

      const vpTl = gsap.timeline({
        scrollTrigger: {
          trigger: videoWrapperRef.current,
          start: 'top top',
          end: '+=2500',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onRefresh: (self) => {
            if (self.spacer) self.spacer.style.backgroundColor = '#0d0f0d';
            if (self.pin) self.pin.style.backgroundColor = '#0d0f0d';
          },
          onToggle: (self) => {
            if (self.spacer) self.spacer.style.backgroundColor = '#0d0f0d';
            if (self.pin) self.pin.style.backgroundColor = '#0d0f0d';
          },
        },
      });

      vpTl.fromTo(
        videoBoxRef.current,
        { clipPath: 'circle(8% at 50% 50%)' },
        { clipPath: 'circle(150% at 50% 50%)', ease: 'none' }
      );
    });

    return () => {
      if (split && split.revert) split.revert();
      revealTl.kill();
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (lenis && lenisTicker) {
        gsap.ticker.remove(lenisTicker);
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div
      className={`w-full min-h-screen bg-[#0d0f0d] text-[#f3f4f6] font-sans overflow-x-hidden ${className}`}
      style={{ backgroundColor: '#0d0f0d', color: '#f3f4f6' }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .pin-spacer {
              background-color: #0d0f0d  !important;
            }
            body, html {
              background-color: #27272f !important;
            }
          `,
        }}
      />



     
      {/* ── Section 2: Benefit & Headline Section ─────────────────────────── */}
      <section
        ref={benefitRef}
        className="relative w-full min-h-[140vh] md:min-h-[160vh] pb-16 md:pb-20 bg-[#0d0f0d]"
        style={{ backgroundColor: '#0d0f0d' }}
      >
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 flex flex-col items-center text-center relative z-10 bg-[#0d0f0d]"
          style={{ backgroundColor: '#0d0f0d' }}
        >
          {/* Animated Kinetic Headline */}
          <div className="w-full mb-8 sm:mb-12 md:mb-14">
            <p
              ref={paraRef}
              className="text-[clamp(2rem,5vw,5rem)] font-extrabold tracking-tight leading-tight text-white overflow-visible"
            >
              {headingText}
            </p>
          </div>

          {/* Staggered Clip-Path Tag Badges */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 max-w-4xl mx-auto my-4 sm:my-6 mb-8 sm:mb-14">
            {tags.map((tag, idx) => (
              <div
                key={tag.id || `tag-${idx}`}
                ref={(el) => {
                  tagRefs.current[idx] = el;
                }}
                className="px-5 sm:px-8 py-2.5 sm:py-4 rounded-full text-[clamp(0.95rem,2vw,1.8rem)] font-semibold tracking-tight opacity-0 shadow-2xl will-change-[clip-path,opacity]"
                style={{
                  backgroundColor: tag.background,
                  color: tag.color || '#ffffff',
                  clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                }}
              >
                {tag.text}
              </div>
            ))}
          </div>

          {subText && (
            <p className="text-[clamp(0.95rem,1.5vw,1.35rem)] text-zinc-400 font-normal max-w-xl mt-2 sm:mt-4 px-4">
              {subText}
            </p>
          )}
        </div>

        {/* ── Video Pin Section ───────────────────────────────────────────── */}
        <div className="relative w-full bg-[#0d0f0d]" style={{ backgroundColor: '#0d0f0d' }}>
          <div
            ref={videoWrapperRef}
            className="w-full h-screen flex justify-center items-center relative overflow-hidden bg-[#0d0f0d]"
            style={{ backgroundColor: '#0d0f0d' }}
          >
            {/* Absolute solid dark underlay behind the video expansion circle */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none bg-[#0d0f0d]"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#0d0f0d',
                zIndex: 1,
              }}
            />

            <div
              ref={videoBoxRef}
              className="relative w-full h-full overflow-hidden flex justify-center items-center bg-[#0d0f0d] will-change-[clip-path]"
              style={{ backgroundColor: '#0d0f0d', zIndex: 2 }}
            >
              {/* Rotating Circular Text Badge */}
              {badgeImgSrc && (
                <img
                  src={badgeImgSrc}
                  alt="rotating badge"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 z-20 pointer-events-none animate-[spin_18s_linear_infinite] opacity-90 select-none"
                />
              )}

              {/* Drone Video */}
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                className="w-full h-full object-cover bg-[#0d0f0d]"
                style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#0d0f0d' }}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>

              {/* Centered Glassmorphic Play Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex justify-center items-center shadow-xl">
                  <img
                    src="https://cdn.21st.dev/assets/mirror/54/54e9fbc136451340e6617de6907da8643bdc3d2ea455a3e76f5d3e9257d78c62.png"
                    alt="play"
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Bottom Outro Text ─────────────────────────────────── */}
      <section
        className="w-full min-h-screen flex justify-center items-center text-center px-4 sm:px-8 py-8 text-[clamp(1.8rem,4.5vw,4.5rem)] font-bold tracking-tight leading-tight text-white relative z-10 bg-[#0d0f0d]"
        style={{ backgroundColor: '#0d0f0d' }}
      >
        {bottomText}
      </section>
    </div>
  );
};

export default Devbits;
