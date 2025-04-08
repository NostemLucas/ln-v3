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
  location: {
    name: string;
    city: string;
    address: string;
    phone: string;
  };
  education: Record<string, string>;
}

const personnel: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ariel Amaru, MD, PhD",
    specialty: "ONCOHEMATLOGÍA",
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
    location: {
      name: "ONCOCLINIC CLÍNICA ONCOLÓGICA",
      city: "LA PAZ",
      address: "Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.",
      phone: "22785566",
    },
    education: {
      "Medico Cirujano":
        "Médico Cirujano de la Universidad Mayor de San Andrés, Bolivia",
      Hematologo: "Oncohematólogo del Hospital Papa Giovanni XXIII, Italia",
      Doctorado:
        "Doctorado en la Universidad de Milán-Bicocca (UNIMIB), Italia",
      "Especilista de Transplantes":
        "Especialidad en Trasplante de Médula Ósea en la Universidad de Chicago, EE. UU.",
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
    location: {
      name: "ONCOCLINIC CLÍNICA ONCOLÓGICA",
      city: "LA PAZ",
      address: "Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.",
      phone: "22785566",
    },
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
    location: {
      name: "ONCOCLINIC CLÍNICA ONCOLÓGICA",
      city: "LA PAZ",
      address: "Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.",
      phone: "22785566",
    },
    education: {
      "Medico Cirujano":
        "Médico Cirujano de la Universidad Mayor de San Andrés, Bolivia",
      "Residencia Médica": "General en el Hospital Militar Central",
      "Residencia Médica de Sub Especialidad":
        "Especialidad Cirujano Oncólogo de cabeza y cuello en INEN, Lima – Perú",
    },
    languages: ["Ingles", "Español"],
    about: [
      "La Dra. Erika Patiño, médico Cirujano Oncóloga, con formación en la Facultad de Medicina en la Universidad Mayor de San Andrés, con Especialidad en Cirugía General en Hospital Militar Central COSSMIL y Sub-Especialidad en Cirugía Oncológica de Cabeza y Cuello en Lima-Perú, atiende en la división de Cirugía Oncológica con enfoque en cirugía de Cabeza y Cuello de Oncoclinic, como ser maxilectomías, laringectomías, tiroidectomías, mandibulectomías, además de tumores en piel, entre otros. Ofreciendo al paciente la resección tumoral total, toma de biopsias y manejo multidisciplinario en la parte estética y funcional, asociada o no a tratamiento de Quimioterapia y Radioterapia de acuerdo al enfoque terapéutico necesario para beneficio del paciente.",
    ],
    image: "/doctors/patiño.png",
    videoThumbnail: "",
    videoUrl: "https://www.youtube.com/embed/ty6HUWBYIaI?si=SP4yt_kXtis49uMt",
  },
  {
    id: 4,
    name: "Dr. Marcio Denis López Ramirez",
    specialty: "ONCLOGO CLINICO",
    specialities: [
      "Cirujano Oncólogo de cabeza y cuello subespecialidad",
      "Médico especialista – Cirugía general",
      "Cirujano general",
      "Perteneciente al Colegio Médico del Perú",
      "Miembro Titular de la Sociedad de Cancerología de Bolivia",
    ],
    location: {
      name: "ONCOCLINIC CLÍNICA ONCOLÓGICA",
      city: "LA PAZ",
      address: "Obrajes, Avenida Costanerita, entre calles 5 y 6, No. 71.",
      phone: "22785566",
    },
    education: {
      "Medico Cirujano":
        "Médico Cirujano de la Universidad Mayor de San Andrés, Bolivia",
      "Residencia Médica": "General en el Hospital Militar Central",
      "Residencia Médica de Sub Especialidad":
        "Especialidad Cirujano Oncólogo de cabeza y cuello en INEN, Lima – Perú",
    },
    languages: ["Ingles", "Español"],
    about: [
      "La Dra. Erika Patiño, médico Cirujano Oncóloga, con formación en la Facultad de Medicina en la Universidad Mayor de San Andrés, con Especialidad en Cirugía General en Hospital Militar Central COSSMIL y Sub-Especialidad en Cirugía Oncológica de Cabeza y Cuello en Lima-Perú, atiende en la división de Cirugía Oncológica con enfoque en cirugía de Cabeza y Cuello de Oncoclinic, como ser maxilectomías, laringectomías, tiroidectomías, mandibulectomías, además de tumores en piel, entre otros. Ofreciendo al paciente la resección tumoral total, toma de biopsias y manejo multidisciplinario en la parte estética y funcional, asociada o no a tratamiento de Quimioterapia y Radioterapia de acuerdo al enfoque terapéutico necesario para beneficio del paciente.",
    ],
    image: "/doctors/patiño.png",
    videoThumbnail: "",
    videoUrl: "https://www.youtube.com/embed/ty6HUWBYIaI?si=SP4yt_kXtis49uMt",
  },
];

export default personnel;
