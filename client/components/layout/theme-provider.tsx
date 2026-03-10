"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

const TRANSITION_STYLES = `
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }

  ::view-transition-new(root) {
    animation: theme-circle-reveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  @keyframes theme-circle-reveal {
    from {
      clip-path: circle(0% at 0 0);
    }
    to {
      clip-path: circle(150% at 0 0);
    }
  }
`

type ThemeTransitionContextType = {
  toggleTheme: () => void
}

const ThemeTransitionContext = React.createContext<ThemeTransitionContextType>({
  toggleTheme: () => {},
})

const useThemeTransition = () => React.useContext(ThemeTransitionContext)

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: TRANSITION_STYLES }} />
      <ThemeTransitionProvider>
        <ThemeHotkey />
        {children}
      </ThemeTransitionProvider>
    </NextThemesProvider>
  )
}

function ThemeTransitionProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"

    if (!document.startViewTransition) {
      setTheme(nextTheme)
      return
    }

    document.startViewTransition(() => {
      setTheme(nextTheme)
    })
  }, [resolvedTheme, setTheme])

  return (
    <ThemeTransitionContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeTransitionContext.Provider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { toggleTheme } = useThemeTransition()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      toggleTheme()
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [toggleTheme])

  return null
}

export { ThemeProvider, useThemeTransition }
