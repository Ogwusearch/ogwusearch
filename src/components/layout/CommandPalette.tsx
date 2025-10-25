import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Github, Mail, Linkedin, Home, Layers, User, Briefcase, PenTool } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a page or action..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => go("/")}>
            <Home className="mr-2 h-4 w-4" /> Home
          </CommandItem>
          <CommandItem onSelect={() => go("/about")}>
            <User className="mr-2 h-4 w-4" /> About
          </CommandItem>
          <CommandItem onSelect={() => go("/projects")}>
            <Layers className="mr-2 h-4 w-4" /> Projects
          </CommandItem>
          <CommandItem onSelect={() => go("/experience")}>
            <Briefcase className="mr-2 h-4 w-4" /> Experience
          </CommandItem>
          <CommandItem onSelect={() => go("/blog")}>
            <PenTool className="mr-2 h-4 w-4" /> Blog
          </CommandItem>
          <CommandItem onSelect={() => go("/contact")}>
            <Mail className="mr-2 h-4 w-4" /> Contact
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Social">
          <CommandItem onSelect={() => window.open("https://github.com/ogwusearch", "_blank")}>
            <Github className="mr-2 h-4 w-4" /> GitHub
          </CommandItem>
          <CommandItem onSelect={() => window.open("https://linkedin.com/in/ogwusearch", "_blank")}>
            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
          </CommandItem>
          <CommandItem onSelect={() => (window.location.href = "mailto:contact@ogwusearch.dev")}>
            <Mail className="mr-2 h-4 w-4" /> Email
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
