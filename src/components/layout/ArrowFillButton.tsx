"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type PointerEvent,
} from "react";

import { ArrowRight } from "lucide-react";

import "./ArrowFillButton.css";

const DEFAULT_HREF = "#";
const COMPACT_LAYOUT_BREAKPOINT = 1280;
const ANIMATION_DURATION_MS = 450;

export interface ArrowFillButtonOwnProps {
  btnText?: string;
  href?: string;
  className?: string;

  /* Colors */
  bgColor?: string;
  textColor?: string;

  fillBgColor?: string;
  fillTextColor?: string;

  hoverFillBgColor?: string;
  hoverFillTextColor?: string;

  arrowColor?: string;
  hoverArrowColor?: string;

  /* Animation */
  animationDuration?: number;
  fillOnHover?: boolean;
}

export type ArrowFillButtonProps =
  ArrowFillButtonOwnProps &
  Omit<
    ComponentPropsWithoutRef<"a">,
    keyof ArrowFillButtonOwnProps
  >;

function ArrowFillButton({
  btnText = "Components",
  href = DEFAULT_HREF,
  className = "",

  bgColor = "#202b3b",
  textColor = "#ffffff",

  fillBgColor = "#ffffff",
  fillTextColor = "#38BDF8",


  hoverFillBgColor = "#ffffff",
  hoverFillTextColor = "#38BDF8",

  arrowColor,
  hoverArrowColor,

  animationDuration = ANIMATION_DURATION_MS,
  fillOnHover = true,

  ...props
}: ArrowFillButtonProps) {
  const [isReady, setIsReady] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const releaseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${COMPACT_LAYOUT_BREAKPOINT - 1}px)`
    );

    const syncCompactLayout = (
      event: MediaQueryList | MediaQueryListEvent
    ) => {
      const matches =
        "matches" in event
          ? event.matches
          : (
              (event as MediaQueryListEvent)
                .currentTarget as MediaQueryList
            ).matches;

      setIsCompactLayout(matches);

      if (!matches) {
        setIsPressed(false);
      }
    };

    syncCompactLayout(mediaQuery);

    mediaQuery.addEventListener("change", syncCompactLayout);

    return () => {
      mediaQuery.removeEventListener("change", syncCompactLayout);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (releaseTimeoutRef.current) {
        window.clearTimeout(releaseTimeoutRef.current);
      }
    };
  }, []);

  const clearPressedState = () => {
    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
    }

    releaseTimeoutRef.current = window.setTimeout(() => {
      setIsPressed(false);
      releaseTimeoutRef.current = null;
    }, animationDuration);
  };

  const handlePointerDown = (
    event: PointerEvent<HTMLAnchorElement>
  ) => {
    props.onPointerDown?.(event);

    if (!isCompactLayout || event.pointerType === "mouse") {
      return;
    }

    if (releaseTimeoutRef.current) {
      window.clearTimeout(releaseTimeoutRef.current);
      releaseTimeoutRef.current = null;
    }

    setIsPressed(true);
  };

  const handlePointerUp = (
    event: PointerEvent<HTMLAnchorElement>
  ) => {
    props.onPointerUp?.(event);

    if (!isCompactLayout || event.pointerType === "mouse") {
      return;
    }

    clearPressedState();
  };

  const handlePointerCancel = (
    event: PointerEvent<HTMLAnchorElement>
  ) => {
    props.onPointerCancel?.(event);

    if (!isCompactLayout || event.pointerType === "mouse") {
      return;
    }

    clearPressedState();
  };

  const buttonStyle = {
    "--btn-bg": bgColor,
    "--btn-text": textColor,

    "--btn-fill-bg": fillBgColor,
    "--btn-fill-text": fillTextColor,

    "--btn-fill-bg-hover": hoverFillBgColor,
    "--btn-fill-text-hover": hoverFillTextColor,

    "--btn-arrow": arrowColor || fillTextColor,
    "--btn-arrow-hover":
      hoverArrowColor || hoverFillTextColor,

    "--btn-duration": `${animationDuration}ms`,

    "--btn-fill-enabled":
      fillOnHover ? "1" : "0",

    visibility: isReady ? "visible" : "hidden",
  } as CSSProperties;

  return (
    <a
      href={href}
      {...props}
      data-pressed={isPressed ? "true" : "false"}
      data-fill-hover={fillOnHover ? "true" : "false"}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`arrow-fill-button ${className}`}
      style={buttonStyle}
    >
      {/* Normal text */}
      <span className="arrow-fill-button__text">
        {btnText}
      </span>

      {/* Expanding fill */}
      <span
        aria-hidden="true"
        className="arrow-fill-button__fill"
      />

      {/* Filled text */}
      <span
        aria-hidden="true"
        className="arrow-fill-button__filled-text"
      >
        {btnText}
      </span>

      {/* Arrow */}
      <span
        className="arrow-fill-button__icon"
        aria-hidden="true"
      >
        {/* Incoming arrow */}
        <ArrowRight
          className="arrow-fill-button__arrow arrow-fill-button__arrow--incoming"
          strokeWidth={1.8}
        />

        {/* Existing arrow */}
        <ArrowRight
          className="arrow-fill-button__arrow arrow-fill-button__arrow--existing"
          strokeWidth={1.8}
        />
      </span>
    </a>
  );
}

export default ArrowFillButton;