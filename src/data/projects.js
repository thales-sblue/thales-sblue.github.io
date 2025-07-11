import vagasyncFrontLogin from "../assets/vagasync-front-login.png";
import vagasyncBack from "../assets/vagasync-back.png";
import phpBank from "../assets/php-bank-login.png";

import { FaNodeJs } from "react-icons/fa";
import { DiJava } from "react-icons/di";
import { DiPhp } from "react-icons/di";

export const projects = [
    {
        title: "PHP Bank",
        description:
            "Aplicação web de operações bancárias com PHP 8.3, VueJs, Docker, PostgreSQL, validação de saldo, histórico de transações e transferências, extratos de contas.",
        link: "https://github.com/thales-sblue/php-bank",
        image: phpBank,
    },
    {
        title: "BCB - Backend Challenge",
        description:
            "API para gestão de clientes e mensagens com Java 17, Spring Boot, RabbitMQ, Docker e JWT.",
        link: "https://github.com/thales-sblue/bcb-challenge",
        Icon: DiJava,
    },
    {
        title: "Vagasync (Frontend)",
        description:
            "Aplicação web MVC com Spring Boot, Thymeleaf e Tailwind CSS.",
        link: "https://github.com/thales-sblue/front_vagasync",
        image: vagasyncFrontLogin,
    },
    {
        title: "Vagasync (Backend)",
        description:
            "API RESTful com Spring Boot, Java 17, Docker, JWT, JUnit e PostgreSQL.",
        link: "https://github.com/thales-sblue/vagasync",
        image: vagasyncBack,
    },
    {
        title: "Simplified Transaction",
        description:
            "Desafio PicPay em Java, Spring Boot, JUnit/Mockito, Docker e PostgreSQL.",
        link: "https://github.com/thales-sblue/simplified-transaction",
        Icon: DiJava,
    },
    {
        title: "Emissor de Notas Fiscais",
        description:
            "Sistema simples de emissão de notas fiscais com PHP 8.3, VueJs, Docker, PostgreSQL, possui cadastro de clientes, produtos, geração de NF e exportação em PDF.",
        link: "https://github.com/thales-sblue/emissor-notas-fiscais",
        Icon: DiPhp,
    },
    {
        title: "API Auth (Node.js + MongoDB)",
        description:
            "API de autenticação com Node.js, TypeScript, Express, Prisma, JWT e MongoDB.",
        link: "https://github.com/thales-sblue/api-node-jwt",
        Icon: FaNodeJs,
    },
    {
        title: "ToDo List",
        description:
            "Lista de tarefas em Java, Spring Boot, Lombok e H2.",
        link: "https://github.com/thales-sblue/todolist",
        Icon: DiJava,
    },
    {
        title: "Planner Node.js",
        description:
            "Agendador de viagens em Node.js, TypeScript, Prisma e Fastify.",
        link: "https://github.com/thales-sblue/plann.er-node.js",
        Icon: FaNodeJs,
    }
];
