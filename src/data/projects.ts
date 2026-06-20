import vagasyncFrontLogin from "../assets/vagasync-front-login.png";
import vagasyncBack from "../assets/vagasync-back.png";
import phpBank from "../assets/php-bank-login.png";

import type { IconType } from "react-icons";
import { FaNodeJs } from "react-icons/fa";
import { DiJava } from "react-icons/di";
import { DiPhp } from "react-icons/di";

export type Project = {
  title: string;
  description: string;
  stack: string[];
  evidence: string;
  link: string;
  image?: string;
  Icon?: IconType;
};

export const projects: Project[] = [
  {
    title: "PHP Bank",
    description:
      "Aplicação full stack para centralizar operações bancárias, com validação de saldo, transferências, histórico de transações e extratos.",
    stack: ["PHP 8.3", "Vue.js", "Docker", "PostgreSQL"],
    evidence:
      "Regras de negócio financeiras, persistência relacional e integração entre backend e frontend.",
    link: "https://github.com/thales-sblue/php-bank",
    image: phpBank,
  },
  {
    title: "API de Clientes e Mensagens",
    description:
      "Backend para gerenciar clientes e mensagens, combinando acesso autenticado com processamento assíncrono.",
    stack: ["Java 17", "Spring Boot", "RabbitMQ", "Docker", "JWT"],
    evidence:
      "Desacoplamento por mensageria, autenticação por token e construção de APIs com Spring Boot.",
    link: "https://github.com/thales-sblue/bcb-challenge",
    Icon: DiJava,
  },
  {
    title: "Interface Web para Gestão de Vagas",
    description:
      "Aplicação web MVC que organiza a experiência de uso de uma plataforma de vagas com páginas renderizadas no servidor.",
    stack: ["Spring Boot", "Thymeleaf", "Tailwind CSS"],
    evidence:
      "Renderização server-side, composição de interfaces e integração da camada web com Spring Boot.",
    link: "https://github.com/thales-sblue/front_vagasync",
    image: vagasyncFrontLogin,
  },
  {
    title: "API para Gestão de Vagas",
    description:
      "API REST para sustentar os fluxos de uma plataforma de vagas com autenticação e persistência de dados.",
    stack: ["Java 17", "Spring Boot", "PostgreSQL", "Docker", "JWT", "JUnit"],
    evidence:
      "Modelagem de API, segurança por token, testes automatizados e ambiente conteinerizado.",
    link: "https://github.com/thales-sblue/vagasync",
    image: vagasyncBack,
  },
  {
    title: "Serviço de Transações Simplificado",
    description:
      "Backend de estudo para implementar um fluxo simplificado de transações e suas regras de domínio.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Docker", "JUnit", "Mockito"],
    evidence:
      "Organização de regras transacionais, testes unitários com mocks e persistência relacional.",
    link: "https://github.com/thales-sblue/simplified-transaction",
    Icon: DiJava,
  },
  {
    title: "Emissor de Notas Fiscais",
    description:
      "Sistema full stack para cadastrar clientes e produtos, gerar notas fiscais e exportar documentos em PDF.",
    stack: ["PHP 8.3", "Vue.js", "Docker", "PostgreSQL"],
    evidence:
      "Fluxos de cadastro, regras de emissão, geração de documentos e integração entre frontend e backend.",
    link: "https://github.com/thales-sblue/emissor-notas-fiscais",
    Icon: DiPhp,
  },
  {
    title: "API de Autenticação",
    description:
      "Serviço backend para autenticar usuários e proteger o acesso a recursos por meio de tokens.",
    stack: ["Node.js", "TypeScript", "Express", "Prisma", "JWT", "MongoDB"],
    evidence:
      "Autenticação stateless, tipagem no backend e persistência de dados com ORM.",
    link: "https://github.com/thales-sblue/api-node-jwt",
    Icon: FaNodeJs,
  },
  {
    title: "API de Gestão de Tarefas",
    description:
      "Aplicação backend para organizar tarefas em uma estrutura simples de dados e operações.",
    stack: ["Java", "Spring Boot", "Lombok", "H2"],
    evidence:
      "Estruturação de serviço com Spring Boot, modelagem de dados e persistência em banco embarcado.",
    link: "https://github.com/thales-sblue/todolist",
    Icon: DiJava,
  },
  {
    title: "Planejador de Viagens",
    description:
      "Serviço backend para organizar viagens e centralizar os dados de planejamento.",
    stack: ["Node.js", "TypeScript", "Fastify", "Prisma"],
    evidence:
      "Construção de API tipada, organização de domínio e acesso a dados com ORM.",
    link: "https://github.com/thales-sblue/plann.er-node.js",
    Icon: FaNodeJs,
  },
];
