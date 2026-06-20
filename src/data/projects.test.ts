import { describe, expect, it } from "vitest";
import { projects } from "./projects";

const projectsWithImages = [
  "PHP Bank",
  "Interface Web para Gestão de Vagas",
  "API para Gestão de Vagas",
];

const projectsWithIcons = [
  "API de Clientes e Mensagens",
  "Serviço de Transações Simplificado",
  "Emissor de Notas Fiscais",
  "API de Autenticação",
  "API de Gestão de Tarefas",
  "Planejador de Viagens",
];

describe("projects data", () => {
  it("contains exactly nine projects", () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects).toHaveLength(9);
  });

  it("contains the required non-empty fields and valid GitHub links", () => {
    for (const project of projects) {
      expect(project.title.trim()).not.toBe("");
      expect(project.description.trim()).not.toBe("");
      expect(project.stack.length).toBeGreaterThan(0);
      expect(
        project.stack.every((technology) => technology.trim() !== ""),
      ).toBe(true);
      expect(project.evidence.trim()).not.toBe("");
      expect(() => new URL(project.link)).not.toThrow();
      expect(project.link).toMatch(/^https:\/\/github\.com\/thales-sblue\//);
    }
  });

  it("keeps project titles and links unique", () => {
    const titles = projects.map(({ title }) => title);
    const links = projects.map(({ link }) => link);

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(links).size).toBe(links.length);
  });

  it("keeps image and icon projects on their existing media type", () => {
    expect(
      projects.filter(({ image }) => image).map(({ title }) => title),
    ).toEqual(projectsWithImages);
    expect(
      projects.filter(({ Icon }) => Icon).map(({ title }) => title),
    ).toEqual(projectsWithIcons);

    for (const project of projects) {
      if (projectsWithImages.includes(project.title)) {
        expect(project.image).toBeDefined();
      }
      if (projectsWithIcons.includes(project.title)) {
        expect(project.Icon).toBeDefined();
      }
    }
  });
});
