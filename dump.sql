--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id character varying(100) NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id character varying(100) NOT NULL,
    title character varying(100) NOT NULL,
    uri character varying(100) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colors (
    id character varying(100) NOT NULL,
    name character varying(100) NOT NULL,
    hex character varying(7) NOT NULL
);


ALTER TABLE public.colors OWNER TO postgres;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id character varying(100) NOT NULL,
    title character varying(100) NOT NULL,
    friendly character varying(100)
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: materials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.materials (
    id character varying(100) NOT NULL,
    title character varying(100) NOT NULL
);


ALTER TABLE public.materials OWNER TO postgres;

--
-- Name: product_colors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_colors (
    product_id character varying(100) NOT NULL,
    color_id character varying(100) NOT NULL
);


ALTER TABLE public.product_colors OWNER TO postgres;

--
-- Name: product_materials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_materials (
    product_id character varying(100) NOT NULL,
    material_id character varying(100) NOT NULL
);


ALTER TABLE public.product_materials OWNER TO postgres;

--
-- Name: product_seems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_seems (
    product_id character varying(100) NOT NULL,
    similar_product_id character varying(100) NOT NULL
);


ALTER TABLE public.product_seems OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id character varying(100) NOT NULL,
    title character varying(100) NOT NULL,
    article character varying(100) NOT NULL,
    brand_id character varying(100) NOT NULL,
    category_id character varying(100) NOT NULL,
    country_id character varying(100) NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    depth integer NOT NULL,
    photos character varying(255)[] NOT NULL,
    price integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schema_migrations (
    version bigint NOT NULL,
    dirty boolean NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO postgres;

--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands (id, name) FROM stdin;
1b4d1d60-f66c-45ad-b1f1-9009c43534be	Адидас Вова
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, title, uri) FROM stdin;
967f882b-8489-4a88-a21b-a206504d6c34	Шкаф	Shkaf
\.


--
-- Data for Name: colors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.colors (id, name, hex) FROM stdin;
d2ba0c4c-0497-4386-9789-6c346f0ad7fc	Нигер	0x0000
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, title, friendly) FROM stdin;
df7b25a7-72f2-4e50-a54b-0cd5bceec692	Prussia	no
\.


--
-- Data for Name: materials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.materials (id, title) FROM stdin;
bb2d767e-2da1-45f8-a9a0-42d14a33ed51	Пенис
\.


--
-- Data for Name: product_colors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_colors (product_id, color_id) FROM stdin;
c0595432-21be-4d34-85df-175c3c2472a0	d2ba0c4c-0497-4386-9789-6c346f0ad7fc
9eeb7eea-d5c8-4cb6-83a4-c52d647e7930	d2ba0c4c-0497-4386-9789-6c346f0ad7fc
\.


--
-- Data for Name: product_materials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_materials (product_id, material_id) FROM stdin;
c0595432-21be-4d34-85df-175c3c2472a0	bb2d767e-2da1-45f8-a9a0-42d14a33ed51
9eeb7eea-d5c8-4cb6-83a4-c52d647e7930	bb2d767e-2da1-45f8-a9a0-42d14a33ed51
\.


--
-- Data for Name: product_seems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_seems (product_id, similar_product_id) FROM stdin;
9eeb7eea-d5c8-4cb6-83a4-c52d647e7930	c0595432-21be-4d34-85df-175c3c2472a0
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, title, article, brand_id, category_id, country_id, width, height, depth, photos, price, description) FROM stdin;
c0595432-21be-4d34-85df-175c3c2472a0	Дилдо	1488	1b4d1d60-f66c-45ad-b1f1-9009c43534be	967f882b-8489-4a88-a21b-a206504d6c34	df7b25a7-72f2-4e50-a54b-0cd5bceec692	14	88	14	{./images/penis.jpg}	1488	Лучшее что есть на рынке
9eeb7eea-d5c8-4cb6-83a4-c52d647e7930	Дилдо почти такой же, но ток похожий	14881	1b4d1d60-f66c-45ad-b1f1-9009c43534be	967f882b-8489-4a88-a21b-a206504d6c34	df7b25a7-72f2-4e50-a54b-0cd5bceec692	14	88	14	{./images/penis.jpg}	1488	Лучшее что есть на рынке
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schema_migrations (version, dirty) FROM stdin;
1	f
\.


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: materials materials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materials
    ADD CONSTRAINT materials_pkey PRIMARY KEY (id);


--
-- Name: product_colors product_colors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_colors
    ADD CONSTRAINT product_colors_pkey PRIMARY KEY (product_id, color_id);


--
-- Name: product_materials product_materials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_materials
    ADD CONSTRAINT product_materials_pkey PRIMARY KEY (product_id, material_id);


--
-- Name: product_seems product_seems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_seems
    ADD CONSTRAINT product_seems_pkey PRIMARY KEY (product_id, similar_product_id);


--
-- Name: products products_article_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_article_key UNIQUE (article);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products products_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_title_key UNIQUE (title);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: product_colors product_colors_color_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_colors
    ADD CONSTRAINT product_colors_color_id_fkey FOREIGN KEY (color_id) REFERENCES public.colors(id);


--
-- Name: product_colors product_colors_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_colors
    ADD CONSTRAINT product_colors_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: product_materials product_materials_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_materials
    ADD CONSTRAINT product_materials_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.materials(id);


--
-- Name: product_materials product_materials_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_materials
    ADD CONSTRAINT product_materials_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: product_seems product_seems_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_seems
    ADD CONSTRAINT product_seems_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id);


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: products products_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- PostgreSQL database dump complete
--

