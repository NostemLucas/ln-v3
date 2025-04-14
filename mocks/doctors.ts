export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  videoThumbnail: string;
  videoUrl: string | null;
  about: string[];
  languages: string[];
  specialities: string[];
  locations: {
    name: string;
    city: string;
    address: string;
    phone: string;
    image?: string;
  }[];
  education: Record<string, string>;
  shortDescription: string;
}

const personnel: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ariel Amaru, MD, PhD",
    specialty: "ONCOHEMATOLOGÍA",
    specialities: [
      "Trasplante de Médula Ósea",
      "Hematología y Oncohematología",
      "Trastornos de coagulación",
      "Eritrocitosis y Anemias",
      "Oncohematología",
      "Trasplante de Médula Ósea",
      "Biología Molecular",
      "Secuenciación Genética",
      "Investigación Oncológica",
    ],
    locations: [
      {
        name: "ONCOCLINIC CLÍNICA ONCOLÓGICA",
        city: "LA PAZ",
        address: "Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.",
        phone: "22785566",
        image: "/locations/sede-obrajes.jpg",
      },
      {
        name: "ONCOCLINIC SUCURSAL SOPOCACHI",
        city: "LA PAZ",
        address: "Av. 6 de Agosto Nº2255",
        phone: "22785566",
        image: "/locations/sede-sopocachi.jpg",
      },
    ],
    education: {
      Pregrado:
        "Médico Cirujano por la Universidad Mayor de San Andrés, Bolivia.",
      Especialidad:
        "Oncohematólogo formado en el Hospital Papa Giovanni XXIII, Italia.",
      Doctorado:
        "Doctorado en Ciencias Médicas por la Universidad de Milán-Bicocca (UNIMIB), Italia.",
      Subespecialidad:
        "Especialista en Trasplante de Médula Ósea por la Universidad de Chicago, EE. UU.",
    },
    languages: ["Ingles", "Español"],
    about: [
      "El Dr. Ariel Amaru es Director Médico de Oncoclinic y responsable del área de Trasplante de Células Madre para el tratamiento de enfermedades oncohematológicas como leucemias, linfomas, mielomas, mielofibrosis y aplasia medular. Es autor de publicaciones científicas y colaborador activo en diversos proyectos de investigación.",
      "Se graduó en la Facultad de Medicina de la Universidad Mayor de San Andrés (UMSA) en La Paz, Bolivia. Posteriormente, se especializó en Oncohematología y Trasplante de Médula Ósea en el Ospedale Papa Giovanni XXIII de Bérgamo, Italia, y obtuvo su Doctorado en la Universidad de Milano-Bicocca (UNIMIB), en Milán. Realizó estudios de posdoctorado en la Universidad de Chicago, Estados Unidos.",
      "En Bolivia, fue docente de posgrado en la UMSA (La Paz) y en la UMSS (Cochabamba). En 2017, lideró la implementación del Programa de Trasplante de Médula Ósea en el país y, en 2023, inició el proceso de acreditación internacional de la unidad de trasplantes.",
      "Ese mismo año, fundó el Laboratorio de Investigación en Oncoclinic, donde se aplican técnicas avanzadas de Biología Molecular y Secuenciación Genética orientadas al estudio de enfermedades oncológicas.",
    ],
    image: "/doctors/amaru.png",
    videoThumbnail: "",
    videoUrl: "https://www.youtube.com/embed/l9GhmQZCz-Y?si=ZjmxIEbrSv5IZQqZ",
    shortDescription:
      "Director Médico de Oncoclinic y especialista en trasplante de médula ósea y oncohematología.",
  },
  {
    id: 2,
    name: "Dra. Jimena Yudid Bueno Limachi",
    specialty: "CIRUGIA ONCOLOGICA",
    specialities: [
      "Cirujano Oncólogo",
      "especialista de Internación",
      "Cirujano general",
    ],
    locations: [
      {
        name: "ONCOCLINIC CLÍNICA ONCOLÓGICA",
        city: "LA PAZ",
        address: "Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.",
        phone: "22785566",
        image: "/locations/sede-obrajes.jpg",
      },
    ],
    education: {
      "Medico Cirujano":
        "Médico Cirujano de la Universidad Mayor de San Andrés, Bolivia",
      "Residencia Médica": "Cirugía General en el Hospital Obrero",
      "Residencia Médica de Sub Especialidad":
        " Cirugía Oncológica en HODE Oncológico – CNS",
    },
    languages: ["Ingles", "Español"],
    about: [
      "La Dra. Jimena Bueno, médico Cirujano Oncóloga, formada en la Facultad de Medicina de la Universidad Mayor de San Andrés, con Especialidad en Cirugía General en el Hospital Obrero No2 y Sub-Especialidad en Cirugía Oncológica en HODE Oncológico de la Caja Nacional de Salud, atiende en la división de Cirugía Oncológica de OncoClinic.",
      "Realiza procedimientos quirúrgicos con finalidad diagnóstica como son las Biopsias Incisionales o Excisionales, con el mínimo riesgo de complicación para el paciente oncológico; Cirugía terapeútica, con el objetivo de la remoción total del tumor, como por ejemplo son la Gastrectomía Total, Histerectomía total, Nefrectomía total, entre otros, asociada o no a Radioterapia y/o Quimioterapia Neoadyuvante o adyuvante a la Cirugía.",
      "Si el cáncer ha metastatizado, la cirugía no es el tratamiento principal. Sin embargo, se puede utilizar para reducir el tamaño del tumor primario (un procedimiento llamado citorreducción quirúrgica o cirugía citorreductora), de manera que la radioterapia y la quimioterapia tengan más eficacia. O bien se puede realizar una cirugía para aliviar los síntomas, como el dolor intenso, las náuseas o los vómitos.",
      "La Dra. Obtuvo la sub especialidad de CIRUGÍA ONCOLÓGICA en HODE ONCOLÓGICO de la Caja Nacional de Salud CNS.",
    ],
    image: "/doctors/bueno.png",
    videoThumbnail: "",
    videoUrl: "https://www.youtube.com/embed/ty6HUWBYIaI?si=SP4yt_kXtis49uMt",
    shortDescription:
      "Cirujana Oncológica con amplia experiencia en cirugía general y oncológica en OncoClinic.",
  },
  {
    id: 3,
    name: "Dra. Erika Lourdes Patiño Constancio",
    specialty: "CIRUGIA ONCOLOGICA DE CABEZA Y CUELLO",
    specialities: [
      "Cirujano Oncólogo de cabeza y cuello subespecialidad",
      "Médico especialista – Cirugía general",
      "Cirujano general",
      "Perteneciente al Colegio Médico del Perú",
      "Miembro Titular de la Sociedad de Cancerología de Bolivia",
    ],
    locations: [
      {
        name: "ONCOCLINIC CLÍNICA ONCOLÓGICA",
        city: "LA PAZ",
        address: "Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.",
        phone: "22785566",
        image: "/locations/sede-obrajes.jpg",
      },
    ],

    education: {
      Pregrado:
        "Médico Cirujano por la Universidad Mayor de San Andrés, Bolivia.",
      Especialidad:
        "Residencia Médica en Cirugía General realizada en el Hospital Militar Central.",
      Subespecialidad:
        "Especialidad en Cirugía Oncológica de Cabeza y Cuello en el Instituto Nacional de Enfermedades Neoplásicas (INEN), Lima – Perú.",
    },
    languages: ["Ingles", "Español"],
    about: [
      "La Dra. Erika Patiño, médico Cirujano Oncóloga, con formación en la Facultad de Medicina en la Universidad Mayor de San Andrés, con Especialidad en Cirugía General en Hospital Militar Central COSSMIL y Sub-Especialidad en Cirugía Oncológica de Cabeza y Cuello en Lima-Perú, atiende en la división de Cirugía Oncológica con enfoque en cirugía de Cabeza y Cuello de Oncoclinic, como ser maxilectomías, laringectomías, tiroidectomías, mandibulectomías, además de tumores en piel, entre otros. Ofreciendo al paciente la resección tumoral total, toma de biopsias y manejo multidisciplinario en la parte estética y funcional, asociada o no a tratamiento de Quimioterapia y Radioterapia de acuerdo al enfoque terapéutico necesario para beneficio del paciente.",
    ],
    image: "/doctors/patiño.png",
    videoThumbnail: "",
    videoUrl: "https://www.youtube.com/embed/ty6HUWBYIaI?si=SP4yt_kXtis49uMt",
    shortDescription:
      "Especialista en cirugía oncológica de cabeza y cuello, con formación en Lima – Perú.",
  },
  {
    id: 4,
    name: "Dr. Marcio Denis López Ramirez",
    specialty: "ONCOLOGO CLINICO",
    specialities: [
      "Oncología Clinica",
      "Especialidad de Tratamiento de Inmunoterapia",
      "Especilidad de Terapia Biologica y Quimioterapia",
    ],
    locations: [
      {
        name: "ONCOCLINIC CLÍNICA ONCOLÓGICA",
        city: "LA PAZ",
        address: "Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.",
        phone: "22785566",
        image: "/locations/sede-obrajes.jpg",
      },
    ],
    education: {
      Pregrado:
        "Biología Molecular aplicado a la Oncología Clínica en la Universidad de Liège, Bélgica.",
      Doctorado: "Doctorado en Medicina en el Colegio Médico LatinoAmericano.",
      Especialidad:
        "Medicina General Integral de la Facultad de Ciencias Médicas Faustino Pérez Hernández.",
      Subespecialidad:
        "Médico Oncólogo, Quimioterapia, Inmunoterapia en la Facultad de Ciencias Médicas Faustino Pérez Hernández.",
      "Formación Complementaria":
        "Control de Cáncer, manejo del dolor y Cuidados Paliativos en el Hospital Universitario Camilo Cienfuegos.",
    },
    languages: ["Ingles", "Español"],
    about: [
      "El Dr. Marcio López, médico del área de Oncología Clínica, con formación en Medicina General Integral de la Facultad de Medicina de Sancti Spiritus “Dr. Faustino Pérez Hernández” Cuba, Especialidad en Oncología Clínica, Quimioterapia e Inmunoterapia en Facultad de Medicina Sancti Spiritus, Especialista en Biología Molecular aplicada a Oncología Clínica en Bélgica; manejo del dolor y Cuidados Paliativos en paciente oncológico. Es el encargado del área de Oncología Clínica de OncoClinic, investigador de estudios clínicos de tumores sólidos, como el Melanoma Lentiginoso Acral, Adenocarcinoma de Próstata entre otros, autor y coautor de artículos en revistas científicas.",
      "Tiene el objetivo diagnóstico certero, complementando para el estudio y estadiación de la enfermedad, estudios complementarios de imagen como ser la PET-CT, RMN, Tomografía Axial Computarizada, Biopsias (incisional o percutánea), estudios de Citología, Patología, Inmunohistoquímica, Biología Molecular  y estudios de última generación como la Secuenciación del ADN tumoral para ofrecer el mejor tratamiento al paciente oncológico, como ser Quimioterapia, Inmunoterapia, Terapia Biológica, Hormonoterapia, con finalidad curativa o paliativa, de acuerdo a las últimas actualizaciones terapeúticas y estándares internacionales, mediante el manejo multidisciplinario que abarca el área de Oncología, incluyendo la Cirugía Oncológica adyuvante o neoadyuvante y/o la Radioterapia.",
    ],
    image: "/doctors/lopez.png",
    videoThumbnail: "",
    videoUrl: "https://www.youtube.com/embed/wBwNeeSS9h0?si=x8LI4BusxvKWN4S7",
    shortDescription:
      "Oncólogo clínico con experiencia en quimioterapia, inmunoterapia y biología molecular aplicada.",
  },
  {
    id: 5,
    name: "Dr. Daniel Eduardo Mercado Rodrigo",
    specialty: "Ortopedia oncológica",
    specialities: [
      "Médico Cirujano",
      "Especialidad en Ortopedia y Traumatología",
      "Especialidad en Ortopedia Oncológica",
    ],
    locations: [
      {
        name: "ONCOCLINIC CLÍNICA ONCOLÓGICA",
        city: "LA PAZ",
        address: "Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.",
        phone: "22785566",
        image: "/locations/sede-obrajes.jpg",
      },
    ],
    education: {
      Pregrado: "Médico Cirujano de la Universidad Nuestra Señora de La Paz.",
      Especialidad: "Especialista en Ortopedia y Traumatología.",
      Subespecialidad:
        "Alta Especialidad en Ortopedia Oncológica en el INR - UNAM, México.",
      "Formación Complementaria":
        "Diplomado en Infecciones Óseas y Pseudoartrosis en el INR - UNAM, México.",
    },
    languages: ["Ingles", "Español"],
    about: [
      "El Dr. Daniel Mercado Rodrigo, médico del área de Oncología Quirúrgica, con enfoque en el área de Ortopedia y Traumatología Oncológica, formado en la Universidad de Medicina Nuestra Señora de La Paz, Especialidad en Traumatología y Ortopedia y Alta Especialidad en Ortopedia Oncológica en UNAM-México, además de Diplomado en Infecciones óseas y pseudoartrosis en UNAM-México.",
      "Es el médico encargado del área de Ortopedia Oncológica en OncoClinic, es miembro de la Sociedad Latinoamericana de Tumores Muscoesqueléticos, se especializa en el tratamiento de tumores de extremidades, con la finalidad de recuperación de las mismas, mediante la excéresis total del tumor y estabilización de la extremidad afectada mediante el uso de prótesis modulares como ser de hombro, codo, muñeca, cadera, rodilla  entre otros.",
    ],
    image: "/doctors/mercado.png",
    videoThumbnail: "",
    videoUrl: "https://www.youtube.com/embed/lKXsaJ1xqFk?si=sX6pFWHd3DqH717g",
    shortDescription:
      "Especialista en ortopedia oncológica, experto en tratamiento de tumores óseos y extremidades.",
  },
];

export default personnel;
