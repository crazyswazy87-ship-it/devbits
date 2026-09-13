import {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export interface DriftWallItem {
  image: string
  title?: string
  href?: string
}

export interface DriftWallProps {
  items?: DriftWallItem[]
  columns?: number
  tileWidth?: number
  tileHeight?: number
  gap?: number
  radius?: number
  tilt?: number
  turn?: number
  roll?: number
  perspective?: number
  depth?: number
  speed?: number
  direction?: 'up' | 'down'
  variance?: number
  parallax?: number
  pauseOnHover?: boolean
  lift?: number
  fade?: number
  dim?: number
  grayscale?: boolean
  overlayColor?: string
  className?: string
  style?: CSSProperties
}

interface ColumnMeta {
  copyHeight: number
  copies: number
}

const DEFAULT_ITEMS: DriftWallItem[] = Array.from(
  { length: 15 },
  (_, i) => {
    const ids = [
      1015,
      1025,
      1039,
      1043,
      1044,
      1050,
      1062,
      1069,
      1074,
      1080,
      1084,
      106,
      110,
      133,
      164,
    ]

    return {
      image: `https://picsum.photos/id/${ids[i % ids.length]}/600/400`,
      title: `Tile ${i + 1}`,
    }
  }
)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const columnFactor = (
  index: number,
  variance: number
): number => {
  const pseudo =
    ((index * 0.6180339887 + 0.35) % 1) * 2 - 1

  return 1 + variance * pseudo
}

const DriftWall = ({
  items = DEFAULT_ITEMS,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 14,
  tilt = 16,
  turn = -14,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = 'up',
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = '#060010',
  className = '',
  style,
}: DriftWallProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const trackRefs = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef<number | null>(null)

  const offsetsRef = useRef<number[]>([])
  const velocitiesRef = useRef<number[]>([])

  const hoveredColRef = useRef<number>(-1)
  const wallHoveredRef = useRef(false)

  const pointerRef = useRef({
    x: 0,
    y: 0,
  })

  const pointerDampedRef = useRef({
    x: 0,
    y: 0,
  })

  const lastTsRef = useRef<number | null>(null)

  const [containerHeight, setContainerHeight] =
    useState(600)

  const [activeId, setActiveId] =
    useState<string | null>(null)

  const activeIdRef =
    useRef<string | null>(null)

  const [reduced, setReduced] =
    useState(false)

  /*
   * Reduced motion
   */
  useEffect(() => {
    const initial = prefersReducedMotion()

    setReduced(initial)

    const mq = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const handleChange = (
      event: MediaQueryListEvent
    ) => {
      setReduced(event.matches)
    }

    mq.addEventListener('change', handleChange)

    return () => {
      mq.removeEventListener(
        'change',
        handleChange
      )
    }
  }, [])

  /*
   * Distribute items into columns
   */
  const columnItems = useMemo<
    DriftWallItem[][]
  >(() => {
    const safeColumns = Math.max(
      1,
      Math.floor(columns)
    )

    const cols: DriftWallItem[][] =
      Array.from(
        { length: safeColumns },
        () => []
      )

    items.forEach((item, index) => {
      cols[index % safeColumns].push(item)
    })

    return cols.map(col =>
      col.length
        ? col
        : items.length
          ? items.slice(0, 1)
          : []
    )
  }, [items, columns])

  /*
   * Calculate how many copies of each column
   * are needed for seamless infinite scrolling.
   */
  const columnMeta = useMemo<ColumnMeta[]>(
    () => {
      const unit = tileHeight + gap

      return columnItems.map(col => {
        const copyHeight = Math.max(
          unit,
          col.length * unit
        )

        const copies = Math.max(
          2,
          Math.ceil(
            (containerHeight * 1.6) /
              copyHeight
          ) + 1
        )

        return {
          copyHeight,
          copies,
        }
      })
    },
    [
      columnItems,
      tileHeight,
      gap,
      containerHeight,
    ]
  )

  /*
   * Track container height
   */
  useLayoutEffect(() => {
    const container =
      containerRef.current

    if (!container) return

    const resizeObserver =
      new ResizeObserver(entries => {
        const entry = entries[0]

        if (!entry) return

        setContainerHeight(
          entry.contentRect.height || 600
        )
      })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  /*
   * Base velocity of each column.
   */
  const baseVelocities = useMemo<
    number[]
  >(() => {
    const directionSign =
      direction === 'up' ? 1 : -1

    return columnItems.map((_, column) => {
      const alternatingSign =
        column % 2 === 0 ? 1 : -1

      return (
        speed *
        columnFactor(
          column,
          variance
        ) *
        directionSign *
        alternatingSign
      )
    })
  }, [
    columnItems,
    speed,
    direction,
    variance,
  ])

  /*
   * Reset offsets when structure changes.
   */
  useEffect(() => {
    offsetsRef.current =
      columnMeta.map(
        (meta, column) =>
          meta.copyHeight *
          ((column * 0.37) % 1)
      )

    velocitiesRef.current =
      columnItems.map(() => 0)
  }, [columnMeta, columnItems])

  /*
   * 3D plane transform.
   */
  const applyPlaneTransform =
    useCallback(
      (px: number, py: number) => {
        const plane =
          planeRef.current

        if (!plane) return

        plane.style.transform =
          `translate(-50%, -50%) ` +
          `scale(1.18) ` +
          `rotateX(${tilt + py}deg) ` +
          `rotateY(${turn + px}deg) ` +
          `rotateZ(${roll}deg) ` +
          `translateZ(${-depth}px)`
      },
      [
        tilt,
        turn,
        roll,
        depth,
      ]
    )

  /*
   * Main animation loop.
   */
  useEffect(() => {
    const animate = (
      timestamp: number
    ) => {
      if (
        lastTsRef.current === null
      ) {
        lastTsRef.current =
          timestamp
      }

      const dt = Math.min(
        0.05,
        Math.max(
          0,
          timestamp -
            lastTsRef.current
        ) / 1000
      )

      lastTsRef.current =
        timestamp

      /*
       * Mouse parallax
       */
      const maxTilt =
        parallax * 8

      const targetX =
        pointerRef.current.x *
        maxTilt

      const targetY =
        -pointerRef.current.y *
        maxTilt

      const damp =
        1 -
        Math.exp(-dt / 0.12)

      pointerDampedRef.current.x +=
        (targetX -
          pointerDampedRef.current.x) *
        damp

      pointerDampedRef.current.y +=
        (targetY -
          pointerDampedRef.current.y) *
        damp

      applyPlaneTransform(
        pointerDampedRef.current.x,
        pointerDampedRef.current.y
      )

      /*
       * Column movement
       */
      for (
        let column = 0;
        column <
        trackRefs.current.length;
        column++
      ) {
        const track =
          trackRefs.current[column]

        const meta =
          columnMeta[column]

        if (!track || !meta) {
          continue
        }

        if (reduced) {
          track.style.transform =
            `translate3d(0, ${-(
              offsetsRef.current[
                column
              ] ?? 0
            )}px, 0)`

          continue
        }

        const paused =
          wallHoveredRef.current &&
          pauseOnHover

        const hoverPaused =
          hoveredColRef.current ===
          column

        const factor =
          paused || hoverPaused
            ? 0
            : 1

        const target =
          baseVelocities[column] *
          factor

        const ease =
          1 -
          Math.exp(
            -dt /
              (target === 0
                ? 0.16
                : 0.28)
          )

        velocitiesRef.current[
          column
        ] +=
          (target -
            velocitiesRef.current[
              column
            ]) *
          ease

        let next =
          (offsetsRef.current[
            column
          ] ?? 0) +
          velocitiesRef.current[
            column
          ] *
            dt

        next =
          ((next %
            meta.copyHeight) +
            meta.copyHeight) %
          meta.copyHeight

        offsetsRef.current[
          column
        ] = next

        track.style.transform =
          `translate3d(0, ${-next}px, 0)`
      }

      rafRef.current =
        requestAnimationFrame(
          animate
        )
    }

    rafRef.current =
      requestAnimationFrame(
        animate
      )

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(
          rafRef.current
        )
      }

      rafRef.current = null
      lastTsRef.current = null
    }
  }, [
    baseVelocities,
    columnMeta,
    pauseOnHover,
    parallax,
    reduced,
    applyPlaneTransform,
  ])

  /*
   * Activate tile.
   */
  const activate = useCallback(
    (
      id: string,
      column: number
    ) => {
      activeIdRef.current = id
      hoveredColRef.current =
        column

      setActiveId(id)
    },
    []
  )

  /*
   * Release tile.
   */
  const release = useCallback(
    () => {
      activeIdRef.current = null
      hoveredColRef.current = -1
      setActiveId(null)
    },
    []
  )

  /*
   * Mouse / pointer interaction.
   */
  const handlePointerMove =
    useCallback(
      (
        event: React.PointerEvent<HTMLDivElement>
      ) => {
        const rect =
          containerRef.current?.getBoundingClientRect()

        if (!rect) return

        if (
          parallax > 0 &&
          !reduced
        ) {
          pointerRef.current = {
            x:
              (event.clientX -
                rect.left) /
                rect.width -
              0.5,

            y:
              (event.clientY -
                rect.top) /
                rect.height -
              0.5,
          }
        }

        const element =
          document.elementFromPoint(
            event.clientX,
            event.clientY
          )

        const tile =
          element?.closest?.(
            '[data-tile-id]'
          ) as HTMLElement | null

        if (!tile) return

        const id =
          tile.dataset.tileId ??
          null

        if (
          id ===
          activeIdRef.current
        ) {
          return
        }

        activeIdRef.current = id

        hoveredColRef.current =
          Number(
            tile.dataset.col
          )

        setActiveId(id)
      },
      [parallax, reduced]
    )

  /*
   * Pointer leaving wall.
   */
  const handlePointerLeave =
    useCallback(() => {
      wallHoveredRef.current =
        false

      pointerRef.current = {
        x: 0,
        y: 0,
      }

      release()
    }, [release])

  /*
   * Reset pointer when entering.
   */
  const handlePointerEnter =
    useCallback(() => {
      wallHoveredRef.current =
        true
    }, [])

  /*
   * Tile renderer.
   */
  const renderTile = (
    item: DriftWallItem,
    id: string,
    column: number
  ) => {
    const active =
      activeId === id

    const innerStyle: CSSProperties =
      {
        position: 'absolute',
        inset: gap / 2,
        display: 'block',
        overflow: 'hidden',

        borderRadius: radius,

        background:
          '#0b0b12',

        opacity: active
          ? 1
          : dim,

        transform: active
          ? `translateZ(${lift}px)`
          : 'translateZ(0)',

        boxShadow: active
          ? '0 24px 60px -18px rgba(0,0,0,0.7)'
          : 'none',

        pointerEvents: 'none',

        transition:
          'transform 0.42s cubic-bezier(0.22,1,0.36,1), ' +
          'opacity 0.42s cubic-bezier(0.22,1,0.36,1), ' +
          'box-shadow 0.42s cubic-bezier(0.22,1,0.36,1)',

        transformStyle:
          'preserve-3d',
      }

    const imageStyle: CSSProperties =
      {
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'cover',

        filter: grayscale
          ? active
            ? 'grayscale(0) saturate(1.05)'
            : 'grayscale(1) saturate(0.92)'
          : active
            ? 'grayscale(0) saturate(1.05)'
            : 'grayscale(0) saturate(0.92)',

        userSelect: 'none',

        transition:
          'filter 0.42s cubic-bezier(0.22,1,0.36,1)',
      }

    const overlayStyle: CSSProperties =
      {
        position: 'absolute',
        inset: 0,

        background:
          overlayColor,

        opacity: active ? 0 : 0.42,

        pointerEvents: 'none',

        transition:
          'opacity 0.42s cubic-bezier(0.22,1,0.36,1)',
      }

    const inner = (
      <span
        className="absolute block overflow-hidden"
        style={innerStyle}
      >
        <img
          src={item.image}
          alt={item.title ?? ''}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-full w-full select-none object-cover"
          style={imageStyle}
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={overlayStyle}
        />
      </span>
    )

    const commonProps = {
      className: [
        'relative block shrink-0',
        'outline-none',
        'focus-visible:outline-none',
      ].join(' '),

      'data-tile-id': id,
      'data-col': column,

      onFocus: () =>
        activate(id, column),

      onBlur: release,

      style: {
        width:
          tileWidth + gap,

        height:
          tileHeight + gap,

        transformStyle:
          'preserve-3d' as const,
      },
    }

    if (item.href) {
      return (
        <a
          key={id}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          {...commonProps}
        >
          {inner}
        </a>
      )
    }

    return (
      <div
        key={id}
        tabIndex={0}
        role="button"
        aria-label={
          item.title ?? 'tile'
        }
        {...commonProps}
      >
        {inner}
      </div>
    )
  }

  /*
   * Mask / fade effect.
   */
  const edge =
    Math.max(
      0,
      (1 - fade) * 100
    )

  const rootStyle: CSSProperties =
    {
      perspective: `${perspective}px`,
      perspectiveOrigin:
        '50% 50%',

      WebkitMaskImage:
        `radial-gradient(ellipse 78% 82% at 50% 46%, #000 ${edge}%, transparent 100%), linear-gradient(to top, #000 ${edge}%, transparent 100%)`,

      maskImage:
        `radial-gradient(ellipse 78% 82% at 50% 46%, #000 ${edge}%, transparent 100%), linear-gradient(to top, #000 ${edge}%, transparent 100%)`,

      ...style,
    }

  return (
    <div
      ref={containerRef}
      className={[
        'relative h-full w-full overflow-hidden',
        'select-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={rootStyle}
      onPointerMove={
        handlePointerMove
      }
      onPointerEnter={
        handlePointerEnter
      }
      onPointerLeave={
        handlePointerLeave
      }
      role="group"
      aria-label="Drifting wall of tiles"
    >
      <div
        ref={planeRef}
        className={[
          'absolute left-1/2 top-1/2',
          'flex cursor-pointer',
        ].join(' ')}
        style={{
          transformStyle:
            'preserve-3d',

          transformOrigin:
            '50% 50%',

          willChange:
            reduced
              ? 'auto'
              : 'transform',
        }}
      >
        {columnItems.map(
          (columnItemsForColumn, column) => {
            const meta =
              columnMeta[column]

            if (!meta) return null

            const copies =
              Array.from({
                length: meta.copies,
              })

            return (
              <div
                key={`column-${column}`}
                className="relative"
                style={{
                  width:
                    tileWidth + gap,

                  transformStyle:
                    'preserve-3d',
                }}
              >
                <div
                  ref={element => {
                    trackRefs.current[
                      column
                    ] = element
                  }}
                  className="flex flex-col"
                  style={{
                    willChange: reduced
                      ? 'auto'
                      : 'transform',

                    transformStyle:
                      'preserve-3d',
                  }}
                >
                  {copies.map(
                    (_, copyIndex) =>
                      columnItemsForColumn.map(
                        (
                          item,
                          itemIndex
                        ) =>
                          renderTile(
                            item,
                            `${column}-${copyIndex}-${itemIndex}`,
                            column
                          )
                      )
                  )}
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export default DriftWall
