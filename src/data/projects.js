import vagasyncFrontLogin from "../assets/vagasync-front-login.png";
import vagasyncBack from "../assets/vagasync-back.png";

import { FaNodeJs } from "react-icons/fa";
import { DiJava } from "react-icons/di";
import { DiPhp } from "react-icons/di";

export const projects = [

    {
        title: "BCB - Backend Challenge",
        description:
            "API para gestão de clientes e mensagens com Java 17, Spring Boot, RabbitMQ, Docker e JWT.",
        link: "https://github.com/thales-sblue/bcb-challenge",
        Icon: DiJava,
    },
    {
        title: "PHP Banking API",
        description:
            "API REST de operações bancárias com PHP 8.3, Docker, PostgreSQL, validação de saldo e histórico de transações.",
        link: "https://github.com/thales-blue/php-banking-api",
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
    },
    {
        title: "CRUD API Carros",
        description:
            "CRUD de carros usando Node.js e MySQL.",
        link: "https://github.com/thales-sblue/CRUD-APIcarros",
        Icon: FaNodeJs,
    },
];
