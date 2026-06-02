"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, User, Briefcase, Mail, Download, Moon, Sun, ArrowRight, Zap } from "lucide-react";
import { useTheme } from "next-themes";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const { theme, setTheme } = useTheme();

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "Go Home",
      description: "Navigate to top",
      icon: <Home size={16} />,
      action: () => { document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }); setOpen(false); },
      category: "Navigation",
    },
    {
      id: "about",
      label: "About Ganesh",
      description: "Learn more about me",
      icon: <User size={16} />,
      action: () => { document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); setOpen(false); },
      category: "Navigation",
    },
    {
      id: "work",
      label: "View Projects",
      description: "See my case studies",
      icon: <Briefcase size={16} />,
      action: () => { document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); setOpen(false); },
      category: "Navigation",
    },
    {
      id: "contact",
      label: "Contact Me",
      description: "Get in touch",
      icon: <Mail size={16} />,
      action: () => { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); setOpen(false); },
      category: "Navigation",
    },
    {
      id: "resume",
      label: "Download Resume",
      description: "Get my latest CV",
      icon: <Download size={16} />,
      action: () => { window.open("/resume.pdf", "_blank"); setOpen(false); },
      category: "Actions",
    },
    {
      id: "email",
      label: "Copy Email",
      description: "ganesh@designer.com",
      icon: <Mail size={16} />,
      action: () => { navigator.clipboard.writeText("ganesh@designer.com"); setOpen(false); },
      category: "Actions",
    },
    {
      id: "theme",
      label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      description: "Toggle color scheme",
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      action: () => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); },
      category: "Preferences",
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.description?.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") setSelected((s) => Math.min(s + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setSelected((s) => Math.max(s - 1, 0));
      if (e.key === "Enter" && filtered[selected]) {
        filtered[selected].action();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, selected, filtered]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="cmd-backdrop fixed inset-0 bg-black/30 z-[99990]"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[99991] px-4"
            role="dialog"
            aria-label="Command menu"
          >
            <div className="bg-white dark:bg-[#111] rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
                <Search size={16} className="text-[var(--text-secondary)] shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search commands..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                  className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none"
                />
                <kbd className="text-xs text-[var(--text-secondary)] bg-[var(--border)] px-1.5 py-0.5 rounded font-mono">ESC</kbd>
              </div>
              {/* Results */}
              <div className="max-h-72 overflow-y-auto p-2">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category} className="mb-2">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)] px-2 py-1">{category}</p>
                    {items.map((item, i) => {
                      const globalIdx = filtered.indexOf(item);
                      return (
                        <button
                          key={item.id}
                          onClick={item.action}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group ${
                            globalIdx === selected
                              ? "bg-[var(--accent)] text-white"
                              : "hover:bg-[var(--border)] text-[var(--text-primary)]"
                          }`}
                        >
                          <span className={globalIdx === selected ? "text-white" : "text-[var(--text-secondary)]"}>
                            {item.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.label}</p>
                            {item.description && (
                              <p className={`text-xs truncate ${globalIdx === selected ? "text-white/70" : "text-[var(--text-secondary)]"}`}>
                                {item.description}
                              </p>
                            )}
                          </div>
                          <ArrowRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${globalIdx === selected ? "opacity-100 text-white" : ""}`} />
                        </button>
                      );
                    })}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <p className="text-sm text-[var(--text-secondary)] text-center py-8">No results for &quot;{query}&quot;</p>
                )}
              </div>
              {/* Footer */}
              <div className="border-t border-[var(--border)] px-4 py-2 flex items-center gap-4 text-[var(--text-secondary)]">
                <span className="text-xs flex items-center gap-1">
                  <kbd className="text-[10px] bg-[var(--border)] px-1 rounded font-mono">↑↓</kbd> navigate
                </span>
                <span className="text-xs flex items-center gap-1">
                  <kbd className="text-[10px] bg-[var(--border)] px-1 rounded font-mono">↵</kbd> select
                </span>
                <span className="text-xs flex items-center gap-1">
                  <kbd className="text-[10px] bg-[var(--border)] px-1 rounded font-mono">⌘K</kbd> toggle
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
