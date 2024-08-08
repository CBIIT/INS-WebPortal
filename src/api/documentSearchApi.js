import { handleResponse, handleError } from './apiUtils';

const baseUrl = 'https://datacatalog-dev.ccdi.cancer.gov/service/documents';

export function searchDocument(body) {
  return {
    status: 'success',
    data: {
      pageInfo: {
        page: 1,
        pageSize: 10,
        total: 313,
      },
      sort: {
        name: 'Dataset',
        k: 'dataset_name.raw',
        v: 'asc',
      },
      result: [
        {
          content: {
            data_resource_name: 'dbGaP',
            data_resource_id: 'dbGaP',
            dataset_id: 'dbGaP-phs001928',
            dataset_name: 'A Comprehensive Genomic Study of Pediatric Malignancy',
            desc: 'Malignancy remains the leading cause of disease-related death in children. DNA sequencing studies have shown a paucity of actionable genomic alterations and a low mutation burden across pediatric cancers at diagnosis. We perform a comprehensive genomic and epigenomic analysis of pediatric tumor and normal tissues using next-generation sequencing to identify molecular fingerprints and targets for diagnosis, prognosis, and development of novel therapeutic methods. This study also represents one of the largest of its type to date and provides a rich genomic dataset for the pediatric cancer research community.',
            primary_dataset_scope: 'Project',
            poc: 'Javed Khan',
            poc_email: 'khanjav@mail.nih.gov',
            published_in: null,
            digest_type: 'manual',
            digest_date: '2024-08-01T19:51:33.000Z',
            case_age_at_diagnosis: [
              {
                n: 'Pediatric and Young Adult (<40 years)',
                k: 'Pediatric and Young Adult (<40 years)',
                v: 267,
              },
            ],
            case_disease_diagnosis: [
              {
                n: 'Alveolar Soft Part Sarcoma',
                k: 'Alveolar Soft Part Sarcoma',
                v: null,
              },
              {
                n: 'Clear Cell Sarcoma',
                k: 'Clear Cell Sarcoma',
                v: null,
              },
              {
                n: 'Desmoplastic Small Round Cell Tumor',
                k: 'Desmoplastic Small Round Cell Tumor',
                v: null,
                s: [
                  'Desmoplastic Small Round Cell Tumor',
                  'Desmoplastic Small Round-Cell Neoplasm',
                  'Desmoplastic Small Round-Cell Tumor',
                  'DSRCT',
                  'Polyphenotypic Small Round Cell Tumor',
                ],
              },
              {
                n: 'Endodermal Sinus Tumor',
                k: 'Endodermal Sinus Tumor',
                v: null,
              },
              {
                n: 'Hepatoblastoma',
                k: 'Hepatoblastoma',
                v: null,
                s: [
                  'HBL',
                  'Hepatoblastoma',
                  'Pediatric Embryonal Hepatoma',
                  'Pediatric Hepatoblastoma',
                ],
              },
              {
                n: 'Melanoma',
                k: 'Melanoma',
                v: null,
                s: [
                  'Malignant Melanoma',
                  'Melanoma',
                ],
              },
              {
                n: 'Neuroblastoma',
                k: 'Neuroblastoma',
                v: null,
                s: [
                  'Neuroblastoma',
                  'Neuroblastoma (Schwannian Stroma-Poor)',
                ],
              },
              {
                n: 'Osteosarcoma',
                k: 'Osteosarcoma',
                v: null,
                s: [
                  'Osteogenic Sarcoma',
                  'Osteosarcoma',
                ],
              },
              {
                n: 'Rhabdomyosarcoma',
                k: 'Rhabdomyosarcoma',
                v: null,
                s: [
                  'Rhabdomyosarcoma',
                ],
              },
              {
                n: 'Sarcoma',
                k: 'Sarcoma',
                v: null,
                s: [
                  'SAR',
                  'Sarcoma',
                  'Sarcoma of Soft Tissue and Bone',
                  'Sarcoma of the Soft Tissue and Bone',
                ],
              },
              {
                n: 'Synovial Sarcoma',
                k: 'Synovial Sarcoma',
                v: null,
                s: [
                  'SS',
                  'Synovial Sarcoma',
                  'Synovial Sarcoma, NOS',
                  'Synovial Sarcoma, Not Otherwise Specified',
                ],
              },
              {
                n: 'Teratoma',
                k: 'Teratoma',
                v: null,
                s: [
                  'Teratoma',
                ],
              },
              {
                n: 'Wilms Tumor',
                k: 'Wilms Tumor',
                v: null,
                s: [
                  'Nephroblastoma',
                  'Wilms Tumor',
                  "Wilms' Tumor",
                ],
              },
            ],
            case_race: [
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 267,
              },
            ],
            case_ethnicity: [
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 267,
              },
            ],
            case_id: 267,
            case_sex: [
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 267,
              },
            ],
            sample_anatomic_site: [
              {
                n: 'Adrenal Gland',
                k: 'Adrenal Gland',
                v: 9,
              },
              {
                n: 'Ascending Colon',
                k: 'Ascending Colon',
                v: 2,
              },
              {
                n: 'Bladder',
                k: 'Bladder',
                v: 9,
              },
              {
                n: 'Cerebellum',
                k: 'Cerebellum',
                v: 10,
              },
              {
                n: 'Cerebrum',
                k: 'Cerebrum',
                v: 9,
              },
              {
                n: 'Colon',
                k: 'Colon',
                v: 3,
              },
              {
                n: 'Descending Colon',
                k: 'Descending Colon',
                v: 4,
              },
              {
                n: 'Heart',
                k: 'Heart',
                v: 6,
              },
              {
                n: 'Ileum',
                k: 'Ileum',
                v: 9,
              },
              {
                n: 'Kidney',
                k: 'Kidney',
                v: 9,
              },
              {
                n: 'Liver',
                k: 'Liver',
                v: 9,
              },
              {
                n: 'Lung',
                k: 'Lung',
                v: 9,
              },
              {
                n: 'Ovary',
                k: 'Ovary',
                v: 4,
              },
              {
                n: 'Pancrease',
                k: 'Pancrease',
                v: 5,
              },
              {
                n: 'Prostate',
                k: 'Prostate',
                v: 10,
              },
              {
                n: 'Skeletal Muscle',
                k: 'Skeletal Muscle',
                v: 10,
              },
              {
                n: 'Spleen',
                k: 'Spleen',
                v: 4,
              },
              {
                n: 'Stomach',
                k: 'Stomach',
                v: 6,
              },
              {
                n: 'Testis',
                k: 'Testis',
                v: 6,
              },
              {
                n: 'Ureter',
                k: 'Ureter',
                v: 6,
              },
              {
                n: 'Uterus',
                k: 'Uterus',
                v: 6,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 256,
              },
            ],
            sample_id: 401,
            sample_is_normal: [
              {
                n: 'Yes',
                k: 'Yes',
                v: 147,
              },
              {
                n: 'No',
                k: 'No',
                v: 254,
              },
            ],
            additional: [
              {
                attr_name: 'Grant',
                attr_set: [
                  {
                    k: 'Intramural Research Program of the Center for Cancer Research, NCI',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'dbGaP Study Identifier',
                attr_set: [
                  {
                    k: 'phs001928',
                    v: -1,
                  },
                ],
              },
            ],
          },
        },
        {
          content: {
            data_resource_name: 'GENIE',
            data_resource_id: 'GENIE',
            dataset_id: 'GENIE-GENIE_AKT1',
            dataset_name: 'AACR Project GENIE AKT1 Cohort',
            desc: 'Targeted sequencing of 428 breast cancer patients in the GENIE AKT1 Analysis cohort. The data presented here includes only those patients under the age of 40 years old.',
            primary_dataset_scope: 'Project',
            poc: 'Lillian M. Smyth',
            poc_email: 'lilsmyth@svhg.ie',
            published_in: 'https://doi.org/10.1158/2159-8290.CD-19-1209',
            digest_type: 'manual',
            digest_date: '2024-08-01T19:50:05.000Z',
            case_age_at_diagnosis: [
              {
                n: '25 to 29 years',
                k: '25 to 29 years',
                v: 7,
              },
              {
                n: '30 to 34 years',
                k: '30 to 34 years',
                v: 15,
              },
              {
                n: '35 to 39 years',
                k: '35 to 39 years',
                v: 54,
              },
            ],
            case_ethnicity: [
              {
                n: 'Not Hispanic or Latino',
                k: 'Not Hispanic or Latino',
                v: 76,
              },
            ],
            case_id: 76,
            case_race: [
              {
                n: 'Black or African American',
                k: 'Black or African American',
                v: 4,
              },
              {
                n: 'Other',
                k: 'Other',
                v: 9,
              },
              {
                n: 'White',
                k: 'White',
                v: 53,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 10,
              },
            ],
            case_sex: [
              {
                n: 'Female',
                k: 'Female',
                v: 76,
              },
            ],
            case_tumor_site: [
              {
                n: 'Breast',
                k: 'Breast',
                v: 76,
                s: [
                  'Breast',
                  'Breasts',
                ],
              },
            ],
            case_disease_diagnosis: [
              {
                n: 'Breast Invasive Cancer, NOS',
                k: 'Breast Invasive Cancer, NOS',
                v: 1,
              },
              {
                n: 'Breast Invasive Carcinoma, NOS',
                k: 'Breast Invasive Carcinoma, NOS',
                v: 2,
              },
              {
                n: 'Breast Invasive Ductal Carcinoma',
                k: 'Breast Invasive Ductal Carcinoma',
                v: 64,
              },
              {
                n: 'Breast Invasive Lobular Carcinoma',
                k: 'Breast Invasive Lobular Carcinoma',
                v: 5,
              },
              {
                n: 'Breast Mixed Ductal and Lobular Carcinoma',
                k: 'Breast Mixed Ductal and Lobular Carcinoma',
                v: 4,
              },
            ],
            additional: [
              {
                attr_name: 'Data Repository',
                attr_set: [
                  {
                    k: 'https://genie.cbioportal.org/study/summary?id=brca_akt1_genie_2019',
                    v: -1,
                  },
                ],
              },
            ],
          },
        },
        {
          content: {
            data_resource_name: 'TARGET',
            data_resource_id: 'TARGET',
            dataset_id: 'TARGET-ALL Phase 2',
            dataset_name: 'Acute Lymphoblastic Leukemia (ALL) Expansion Phase 2',
            desc: "In the expansion effort (Phase 2), TARGET investigators analyzed tumors from pediatric patients, most who experienced an early bone marrow relapse (within 4 years of initial diagnosis), to identify new therapeutic approaches and/or biomarkers that correlate with poor clinical outcome to treat childhood pre-cursor B-cell ALL. The tissues used in this study were collected from patients enrolled in Children's Oncology Group (COG) biology studies and clinical trials.",
            primary_dataset_scope: 'Project',
            poc: 'Center for Cancer Genomics',
            poc_email: 'NCICCGenomics@mail.nih.gov',
            published_in: 'https://www.cancer.gov/ccg/research/genome-sequencing/target/publications?field_publication_project_target_id_selective=18&items_per_page=10#acute-lymphoblastic-leukemia-allnbsp',
            digest_type: 'manual',
            digest_date: '2024-08-01T19:50:53.000Z',
            case_age_at_diagnosis: [
              {
                n: '0 to 4 years',
                k: '0 to 4 years',
                v: 597,
              },
              {
                n: '5 to 9 years',
                k: '5 to 9 years',
                v: 339,
              },
              {
                n: '10 to 14 years',
                k: '10 to 14 years',
                v: 401,
              },
              {
                n: '15 to 19 years',
                k: '15 to 19 years',
                v: 220,
              },
              {
                n: '20 to 24 years',
                k: '20 to 24 years',
                v: 20,
              },
              {
                n: '25 to 29 years',
                k: '25 to 29 years',
                v: 3,
              },
              {
                n: 'Pediatric and Young Adult (<40 years)',
                k: 'Pediatric and Young Adult (<40 years)',
                v: 7,
              },
            ],
            case_ethnicity: [
              {
                n: 'Hispanic or Latino',
                k: 'Hispanic or Latino',
                v: 376,
              },
              {
                n: 'Not Hispanic or Latino',
                k: 'Not Hispanic or Latino',
                v: 1125,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 4,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 82,
              },
            ],
            case_id: 1587,
            case_race: [
              {
                n: 'American Indian or Alaska Native',
                k: 'American Indian or Alaska Native',
                v: 4,
              },
              {
                n: 'Asian',
                k: 'Asian',
                v: 67,
              },
              {
                n: 'Black or African American',
                k: 'Black or African American',
                v: 111,
              },
              {
                n: 'Native Hawaiian or Other Pacific Islander',
                k: 'Native Hawaiian or Other Pacific Islander',
                v: 7,
              },
              {
                n: 'White',
                k: 'White',
                v: 1185,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 94,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 119,
              },
            ],
            case_sex: [
              {
                n: 'Female',
                k: 'Female',
                v: 660,
              },
              {
                n: 'Male',
                k: 'Male',
                v: 920,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 3,
              },
            ],
            case_disease_diagnosis: [
              {
                n: 'Precursor B-cell lymphoblastic leukemia',
                k: 'Precursor B-cell lymphoblastic leukemia',
                v: 1313,
              },
              {
                n: 'T lymphoblastic leukemia/lymphoma',
                k: 'T lymphoblastic leukemia/lymphoma',
                v: 269,
                s: [
                  'Precursor T Lymphoblastic Leukemia/Lymphoma',
                  'Precursor T Lymphoblastic Lymphoma/Leukemia',
                  'Precursor T-Lymphoblastic Lymphoma/Leukemia',
                  'T Lymphoblastic Leukemia/Lymphoma',
                  'T-Lymphoblastic Leukemia/Lymphoma',
                ],
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 5,
              },
            ],
            case_tumor_site: [
              {
                n: 'Bone Marrow',
                k: 'Bone Marrow',
                v: 1587,
                s: [
                  'Bone Marrow',
                  'Reticuloendothelial System, Bone Marrow',
                ],
              },
            ],
            additional: [
              {
                attr_name: 'Grant ID',
                attr_set: [
                  {
                    k: '261200800001E-12-0-40',
                    v: -1,
                  },
                  {
                    k: 'U10CA180886',
                    v: -1,
                  },
                  {
                    k: 'HHSN261200800001E',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Grant Name',
                attr_set: [
                  {
                    k: 'Therapeutically Applicable Research to Generate Effective Treatments (TARGET)',
                    v: -1,
                  },
                  {
                    k: 'COG NCTN Network Group Operations Center',
                    v: -1,
                  },
                  {
                    k: 'NCI Contract',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Data Repository',
                attr_set: [
                  {
                    k: 'https://portal.gdc.cancer.gov/analysis_page?app=Projects',
                    v: -1,
                  },
                  {
                    k: 'https://www.cancer.gov/ccg/research/genome-sequencing/target/studied-cancers/acute-lymphoblasic-leukimia',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'dbGaP Study Identifier',
                attr_set: [
                  {
                    k: 'phs000464',
                    v: -1,
                  },
                ],
              },
            ],
          },
        },
        {
          content: {
            data_resource_name: 'TARGET',
            data_resource_id: 'TARGET',
            dataset_id: 'TARGET-ALL Phase 3',
            dataset_name: 'Acute Lymphoblastic Leukemia (ALL) Expansion Phase 3 Acute Leukemias of Ambiguous Lineage (ALAL)',
            desc: 'Leukemia is a cancer of blood cells and can arise within distinct lineages, either lymphoid or myeloid. On occasion, patients present with an acute leukemia for which a specific lineage cannot be clearly determined. These cases are classified as acute leukemias of ambiguous lineage (ALAL), and they account for less than 4% of all acute leukemias across age groups.',
            primary_dataset_scope: 'Project',
            poc: 'Center for Cancer Genomics',
            poc_email: 'NCICCGenomics@mail.nih.gov',
            published_in: 'https://www.cancer.gov/ccg/research/genome-sequencing/target/publications?field_publication_project_target_id_selective=18&items_per_page=10#acute-lymphoblastic-leukemia-allnbsp',
            digest_type: 'manual',
            digest_date: '2024-08-01T19:50:53.000Z',
            case_age_at_diagnosis: [
              {
                n: '0 to 4 years',
                k: '0 to 4 years',
                v: 39,
              },
              {
                n: '5 to 9 years',
                k: '5 to 9 years',
                v: 34,
              },
              {
                n: '10 to 14 years',
                k: '10 to 14 years',
                v: 23,
              },
              {
                n: '15 to 19 years',
                k: '15 to 19 years',
                v: 20,
              },
              {
                n: 'Pediatric and Young Adult (<40 years)',
                k: 'Pediatric and Young Adult (<40 years)',
                v: 75,
              },
            ],
            case_ethnicity: [
              {
                n: 'Hispanic or Latino',
                k: 'Hispanic or Latino',
                v: 7,
              },
              {
                n: 'Not Hispanic or Latino',
                k: 'Not Hispanic or Latino',
                v: 39,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 13,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 132,
              },
            ],
            case_id: 191,
            case_race: [
              {
                n: 'Asian',
                k: 'Asian',
                v: 2,
              },
              {
                n: 'Black or African American',
                k: 'Black or African American',
                v: 10,
              },
              {
                n: 'Native Hawaiian or Other Pacific Islander',
                k: 'Native Hawaiian or Other Pacific Islander',
                v: 1,
              },
              {
                n: 'White',
                k: 'White',
                v: 34,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 16,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 128,
              },
            ],
            case_sex: [
              {
                n: 'Female',
                k: 'Female',
                v: 61,
              },
              {
                n: 'Male',
                k: 'Male',
                v: 102,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 13,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 15,
              },
            ],
            case_disease_diagnosis: [
              {
                n: 'Acute Myeloid Leukemia, NOS',
                k: 'Acute Myeloid Leukemia, NOS',
                v: 18,
              },
              {
                n: 'B Lymphoblastic Leukemia/Lymphoma, NOS',
                k: 'B Lymphoblastic Leukemia/Lymphoma, NOS',
                v: 3,
              },
              {
                n: 'Juvenile Myelomonocytic Leukemia',
                k: 'Juvenile Myelomonocytic Leukemia',
                v: 1,
              },
              {
                n: 'Leukemia, NOS',
                k: 'Leukemia, NOS',
                v: 8,
              },
              {
                n: 'Mixed Phenotype Acute Leukemia With T(9;22)(Q34;Q11.2); BCR-ABL1',
                k: 'Mixed Phenotype Acute Leukemia With T(9;22)(Q34;Q11.2); BCR-ABL1',
                v: 2,
              },
              {
                n: 'Mixed Phenotype Acute Leukemia With T(V;11Q23); MLL Rearranged',
                k: 'Mixed Phenotype Acute Leukemia With T(V;11Q23); MLL Rearranged',
                v: 14,
              },
              {
                n: 'Mixed Phenotype Acute Leukemia, B/Myeloid, NOS',
                k: 'Mixed Phenotype Acute Leukemia, B/Myeloid, NOS',
                v: 30,
              },
              {
                n: 'Mixed Phenotype Acute Leukemia, T/Myeloid, NOS',
                k: 'Mixed Phenotype Acute Leukemia, T/Myeloid, NOS',
                v: 42,
              },
              {
                n: 'T Lymphoblastic Leukemia/Lymphoma',
                k: 'T Lymphoblastic Leukemia/Lymphoma',
                v: 2,
                s: [
                  'Precursor T Lymphoblastic Leukemia/Lymphoma',
                  'Precursor T Lymphoblastic Lymphoma/Leukemia',
                  'Precursor T-Lymphoblastic Lymphoma/Leukemia',
                  'T Lymphoblastic Leukemia/Lymphoma',
                  'T-Lymphoblastic Leukemia/Lymphoma',
                ],
              },
              {
                n: 'Undifferentiated Leukaemia',
                k: 'Undifferentiated Leukaemia',
                v: 5,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 66,
              },
            ],
            case_tumor_site: [
              {
                n: 'Bone Marrow',
                k: 'Bone Marrow',
                v: 191,
                s: [
                  'Bone Marrow',
                  'Reticuloendothelial System, Bone Marrow',
                ],
              },
            ],
            additional: [
              {
                attr_name: 'Grant ID',
                attr_set: [
                  {
                    k: '261200800001E-12-0-40',
                    v: -1,
                  },
                  {
                    k: 'U10CA180886',
                    v: -1,
                  },
                  {
                    k: 'HHSN261200800001E',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Grant Name',
                attr_set: [
                  {
                    k: 'Therapeutically Applicable Research to Generate Effective Treatments (TARGET)',
                    v: -1,
                  },
                  {
                    k: 'COG NCTN Network Group Operations Center',
                    v: -1,
                  },
                  {
                    k: 'NCI Contract',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Data Repository',
                attr_set: [
                  {
                    k: 'https://portal.gdc.cancer.gov/analysis_page?app=Projects',
                    v: -1,
                  },
                  {
                    k: 'https://www.cancer.gov/ccg/research/genome-sequencing/target/studied-cancers/acute-lymphoblasic-leukimia',
                    v: -1,
                  },
                ],
              },
            ],
          },
        },
        {
          content: {
            data_resource_name: 'TARGET',
            data_resource_id: 'TARGET',
            dataset_id: 'TARGET-ALL Phase 1',
            dataset_name: 'Acute Lymphoblastic Leukemia (ALL) Pilot Phase 1',
            desc: "The TARGET ALL Pilot project has produced comprehensive genomic profiles of nearly 200 high-risk, clinically annotated, B-cell ALL patient cases from Children's Oncology Group (COG) for molecular alterations.",
            primary_dataset_scope: 'Project',
            poc: 'Center for Cancer Genomics',
            poc_email: 'NCICCGenomics@mail.nih.gov',
            published_in: 'https://www.cancer.gov/ccg/research/genome-sequencing/target/publications?field_publication_project_target_id_selective=18&items_per_page=10#acute-lymphoblastic-leukemia-allnbsp',
            digest_type: 'manual',
            digest_date: '2024-08-01T19:50:53.000Z',
            case_age_at_diagnosis: [
              {
                n: '0 to 4 years',
                k: '0 to 4 years',
                v: 4,
              },
              {
                n: '5 to 9 years',
                k: '5 to 9 years',
                v: 5,
              },
              {
                n: '10 to 14 years',
                k: '10 to 14 years',
                v: 11,
              },
              {
                n: '15 to 19 years',
                k: '15 to 19 years',
                v: 3,
              },
              {
                n: 'Pediatric and Young Adult (<40 years)',
                k: 'Pediatric and Young Adult (<40 years)',
                v: 1,
              },
            ],
            case_ethnicity: [
              {
                n: 'Hispanic or Latino',
                k: 'Hispanic or Latino',
                v: 13,
              },
              {
                n: 'Not Hispanic or Latino',
                k: 'Not Hispanic or Latino',
                v: 10,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 1,
              },
            ],
            case_id: 24,
            case_race: [
              {
                n: 'Asian',
                k: 'Asian',
                v: 2,
              },
              {
                n: 'Black or African American',
                k: 'Black or African American',
                v: 1,
              },
              {
                n: 'White',
                k: 'White',
                v: 18,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 3,
              },
            ],
            case_sex: [
              {
                n: 'Female',
                k: 'Female',
                v: 9,
              },
              {
                n: 'Male',
                k: 'Male',
                v: 14,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 1,
              },
            ],
            case_disease_diagnosis: [
              {
                n: 'Mixed Phenotype Acute Leukemia, B/Myeloid, NOS',
                k: 'Mixed Phenotype Acute Leukemia, B/Myeloid, NOS',
                v: 1,
              },
              {
                n: 'Precursor B-Cell Lymphoblastic Leukemia',
                k: 'Precursor B-Cell Lymphoblastic Leukemia',
                v: 22,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 1,
              },
            ],
            case_tumor_site: [
              {
                n: 'Bone Marrow',
                k: 'Bone Marrow',
                v: 23,
                s: [
                  'Bone Marrow',
                  'Reticuloendothelial System, Bone Marrow',
                ],
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 1,
                s: [
                  'Not Reported',
                ],
              },
            ],
            additional: [
              {
                attr_name: 'Grant ID',
                attr_set: [
                  {
                    k: '261200800001E-12-0-40',
                    v: -1,
                  },
                  {
                    k: 'U10CA180886',
                    v: -1,
                  },
                  {
                    k: 'HHSN261200800001E',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Grant Name',
                attr_set: [
                  {
                    k: 'Therapeutically Applicable Research to Generate Effective Treatments (TARGET)',
                    v: -1,
                  },
                  {
                    k: 'COG NCTN Network Group Operations Center',
                    v: -1,
                  },
                  {
                    k: 'NCI Contract',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Data Repository',
                attr_set: [
                  {
                    k: 'https://portal.gdc.cancer.gov/analysis_page?app=Projects',
                    v: -1,
                  },
                  {
                    k: 'https://www.cancer.gov/ccg/research/genome-sequencing/target/studied-cancers/acute-lymphoblasic-leukimia',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'dbGaP Study Identifier',
                attr_set: [
                  {
                    k: 'phs000463',
                    v: -1,
                  },
                ],
              },
            ],
          },
        },
        {
          content: {
            data_resource_name: 'TARGET',
            data_resource_id: 'TARGET',
            dataset_id: 'TARGET-AML',
            dataset_name: 'Acute Myeloid Leukemia (AML)',
            desc: 'The TARGET Acute Myeloid Leukemia projects elucidate comprehensive molecular characterization to determine the genetic changes that drive the initiation and progression of high-risk or hard-to-treat childhood cancers. Acute myeloid leukemia (AML) is a cancer that originates in the bone marrow from immature white blood cells known as myeloblasts. About 25% of all children with leukemia have AML.',
            primary_dataset_scope: 'Project',
            poc: 'Center for Cancer Genomics',
            poc_email: 'NCICCGenomics@mail.nih.gov',
            published_in: 'https://www.cancer.gov/ccg/research/genome-sequencing/target/publications?field_publication_project_target_id_selective=18&items_per_page=10#acute-myeloid-leukemia-aml',
            digest_type: 'manual',
            digest_date: '2024-08-01T19:50:54.000Z',
            case_age_at_diagnosis: [
              {
                n: '0 to 4 years',
                k: '0 to 4 years',
                v: 660,
              },
              {
                n: '5 to 9 years',
                k: '5 to 9 years',
                v: 394,
              },
              {
                n: '10 to 14 years',
                k: '10 to 14 years',
                v: 553,
              },
              {
                n: '15 to 19 years',
                k: '15 to 19 years',
                v: 492,
              },
              {
                n: '20 to 24 years',
                k: '20 to 24 years',
                v: 49,
              },
              {
                n: '25 to 29 years',
                k: '25 to 29 years',
                v: 10,
              },
              {
                n: 'Pediatric and Young Adult (<40 years)',
                k: 'Pediatric and Young Adult (<40 years)',
                v: 334,
              },
            ],
            case_ethnicity: [
              {
                n: 'Hispanic or Latino',
                k: 'Hispanic or Latino',
                v: 385,
              },
              {
                n: 'Not Hispanic or Latino',
                k: 'Not Hispanic or Latino',
                v: 1693,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 315,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 99,
              },
            ],
            case_id: 2492,
            case_race: [
              {
                n: 'American Indian or Alaska Native',
                k: 'American Indian or Alaska Native',
                v: 13,
              },
              {
                n: 'Asian',
                k: 'Asian',
                v: 97,
              },
              {
                n: 'Black or African American',
                k: 'Black or African American',
                v: 251,
              },
              {
                n: 'Native Hawaiian or other Pacific Islander',
                k: 'Native Hawaiian or other Pacific Islander',
                v: 9,
              },
              {
                n: 'Other',
                k: 'Other',
                v: 22,
              },
              {
                n: 'White',
                k: 'White',
                v: 1551,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 324,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 225,
              },
            ],
            case_sex: [
              {
                n: 'Female',
                k: 'Female',
                v: 1022,
              },
              {
                n: 'Male',
                k: 'Male',
                v: 1136,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 315,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 19,
              },
            ],
            case_disease_diagnosis: [
              {
                n: 'Acute Myeloid Leukemia, NOS',
                k: 'Acute Myeloid Leukemia, NOS',
                v: 2492,
              },
            ],
            case_tumor_site: [
              {
                n: 'Bone Marrow',
                k: 'Bone Marrow',
                v: 2492,
                s: [
                  'Bone Marrow',
                  'Reticuloendothelial System, Bone Marrow',
                ],
              },
            ],
            additional: [
              {
                attr_name: 'Grant ID',
                attr_set: [
                  {
                    k: '261200800001E-12-0-40',
                    v: -1,
                  },
                  {
                    k: 'U10CA180886',
                    v: -1,
                  },
                  {
                    k: 'HHSN261200800001E',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Grant Name',
                attr_set: [
                  {
                    k: 'Therapeutically Applicable Research to Generate Effective Treatments (TARGET)',
                    v: -1,
                  },
                  {
                    k: 'COG NCTN Network Group Operations Center',
                    v: -1,
                  },
                  {
                    k: 'NCI Contract',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Data Repository',
                attr_set: [
                  {
                    k: 'https://portal.gdc.cancer.gov/analysis_page?app=Projects',
                    v: -1,
                  },
                  {
                    k: 'https://www.cancer.gov/ccg/research/genome-sequencing/target/studied-cancers/acute-myeloid-leukemia',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'dbGaP Study Identifier',
                attr_set: [
                  {
                    k: 'phs000465',
                    v: -1,
                  },
                ],
              },
            ],
          },
        },
        {
          content: {
            data_resource_name: 'cBioPortal',
            data_resource_id: 'cBioPortal',
            dataset_id: 'cBioPortal-AML_OHSU',
            dataset_name: 'Acute Myeloid Leukemia OHSU',
            desc: 'Whole-exome and transcriptomic sequencing of 942 acute myeloid leukemia samples (with 500 matched normals) from the Beat AML program. The cases here are only those under the age of 40 years old.',
            primary_dataset_scope: 'Project',
            poc: 'Jeffrey W Tyner',
            poc_email: 'tynerj@ohsu.edu',
            published_in: 'https://doi.org/10.1016/j.ccell.2022.07.002',
            digest_type: 'manual',
            digest_date: '2024-08-01T19:51:18.000Z',
            case_age_at_diagnosis: [
              {
                n: '0 to 4 years',
                k: '0 to 4 years',
                v: 6,
              },
              {
                n: '5 to 9 years',
                k: '5 to 9 years',
                v: 4,
              },
              {
                n: '10 to 14 years',
                k: '10 to 14 years',
                v: 8,
              },
              {
                n: '15 to 19 years',
                k: '15 to 19 years',
                v: 5,
              },
              {
                n: '20 to 24 years',
                k: '20 to 24 years',
                v: 22,
              },
              {
                n: '25 to 29 years',
                k: '25 to 29 years',
                v: 22,
              },
              {
                n: '30 to 34 years',
                k: '30 to 34 years',
                v: 32,
              },
              {
                n: '35 to 39 years',
                k: '35 to 39 years',
                v: 30,
              },
            ],
            case_ethnicity: [
              {
                n: 'Hispanic or Latino',
                k: 'Hispanic or Latino',
                v: 17,
              },
              {
                n: 'Not Hispanic or Latino',
                k: 'Not Hispanic or Latino',
                v: 69,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 43,
              },
            ],
            case_id: 129,
            case_race: [
              {
                n: 'Asian',
                k: 'Asian',
                v: 5,
              },
              {
                n: 'Black or African American',
                k: 'Black or African American',
                v: 3,
              },
              {
                n: 'More Than One Race',
                k: 'More Than One Race',
                v: 4,
              },
              {
                n: 'Native Hawaiian or Other Pacific Islander',
                k: 'Native Hawaiian or Other Pacific Islander',
                v: 2,
              },
              {
                n: 'White',
                k: 'White',
                v: 80,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 33,
              },
              {
                n: 'Unknown',
                k: 'Unknown',
                v: 2,
              },
            ],
            case_sex: [
              {
                n: 'Female',
                k: 'Female',
                v: 69,
              },
              {
                n: 'Male',
                k: 'Male',
                v: 60,
              },
            ],
            case_tumor_site: [
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 129,
                s: [
                  'Not Reported',
                ],
              },
            ],
            case_disease_diagnosis: [
              {
                n: 'Acute Megakaryoblastic Leukaemia',
                k: 'Acute Megakaryoblastic Leukaemia',
                v: 1,
              },
              {
                n: 'Acute Monoblastic And Monocytic Leukaemia',
                k: 'Acute Monoblastic And Monocytic Leukaemia',
                v: 5,
              },
              {
                n: 'Acute Myeloid Leukaemia, NOS',
                k: 'Acute Myeloid Leukaemia, NOS',
                v: 14,
              },
              {
                n: 'Acute Myelomonocytic Leukaemia',
                k: 'Acute Myelomonocytic Leukaemia',
                v: 6,
              },
              {
                n: 'Acute Promyelocytic Leukaemia with t(15;17)(q22;q12); PML-RARA',
                k: 'Acute Promyelocytic Leukaemia with t(15;17)(q22;q12); PML-RARA',
                v: 8,
              },
              {
                n: 'Acute Undifferentiated Leukaemia',
                k: 'Acute Undifferentiated Leukaemia',
                v: 1,
              },
              {
                n: 'AML with inv(16)(p13.1q22) or t(16;16)(p13.1;q22); CBFB-MYH11',
                k: 'AML with inv(16)(p13.1q22) or t(16;16)(p13.1;q22); CBFB-MYH11',
                v: 18,
              },
              {
                n: 'AML with inv(3)(q21q26.2) or t(3;3)(q21;q26.2); RPN1-EVI1',
                k: 'AML with inv(3)(q21q26.2) or t(3;3)(q21;q26.2); RPN1-EVI1',
                v: 3,
              },
              {
                n: 'AML with Maturation',
                k: 'AML with Maturation',
                v: 2,
              },
              {
                n: 'AML with Minimal Differentiation',
                k: 'AML with Minimal Differentiation',
                v: 3,
              },
              {
                n: 'AML with Mutated CEBPA',
                k: 'AML with Mutated CEBPA',
                v: 7,
              },
              {
                n: 'AML with Mutated NPM1',
                k: 'AML with Mutated NPM1',
                v: 17,
              },
              {
                n: 'AML with Myelodysplasia-Related Changes',
                k: 'AML with Myelodysplasia-Related Changes',
                v: 7,
              },
              {
                n: 'AML with t(6;9)(p23;q34); DEK-NUP214',
                k: 'AML with t(6;9)(p23;q34); DEK-NUP214',
                v: 3,
              },
              {
                n: 'AML with t(8;21)(q22;Q22); RUNX1-RUNX1T1',
                k: 'AML with t(8;21)(q22;Q22); RUNX1-RUNX1T1',
                v: 9,
              },
              {
                n: 'AML with t(9;11)(p22;Q\\q23); MLLT3-MLL',
                k: 'AML with t(9;11)(p22;Q\\q23); MLLT3-MLL',
                v: 6,
              },
              {
                n: 'AML without Maturation',
                k: 'AML without Maturation',
                v: 5,
              },
              {
                n: 'Mixed Phenotype Acute Leukaemia, B/Myeloid, NOS',
                k: 'Mixed Phenotype Acute Leukaemia, B/Myeloid, NOS',
                v: 1,
              },
              {
                n: 'Mixed Phenotype Acute Leukaemia, T/Myeloid, NOS',
                k: 'Mixed Phenotype Acute Leukaemia, T/Myeloid, NOS',
                v: 2,
              },
              {
                n: 'Myeloid Leukaemia Associated with Down Syndrome',
                k: 'Myeloid Leukaemia Associated with Down Syndrome',
                v: 2,
              },
              {
                n: 'Myeloid Sarcoma',
                k: 'Myeloid Sarcoma',
                v: 2,
              },
              {
                n: 'Therapy-Related Myeloid Neoplasms',
                k: 'Therapy-Related Myeloid Neoplasms',
                v: 7,
              },
            ],
            additional: [
              {
                attr_name: 'Data Repository',
                attr_set: [
                  {
                    k: 'https://www.cbioportal.org/study/summary?id=aml_ohsu_2022',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Grant ID',
                attr_set: [
                  {
                    k: 'R01CA262758',
                    v: -1,
                  },
                  {
                    k: 'R01CA245002',
                    v: -1,
                  },
                  {
                    k: 'U01CA217862',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Grant Name',
                attr_set: [
                  {
                    k: 'Mechanisms of venetoclax combination activity in acute myeloid leukemia',
                    v: -1,
                  },
                  {
                    k: 'Targeting PTPN11 dependent Hematologic Malignancies',
                    v: -1,
                  },
                  {
                    k: 'Functional Genomic Discovery of Pathway Targeted and Immune Modulatory Therapeutic Combinations in Hematologic Malignancies',
                    v: -1,
                  },
                ],
              },
            ],
          },
        },
        {
          content: {
            data_resource_name: 'All of Us',
            data_resource_id: 'All of Us',
            dataset_id: 'All of Us-All of Us',
            dataset_name: 'All of Us',
            desc: 'The All of Us Research Hub matches a broad research community with a diverse set of research participants. Its goal is to advance precision medicine research and fuel new insights into human health. The Research Hub houses one of the largest, most diverse, and most broadly accessible datasets ever assembled. It also provides an interactive Data Browser where anyone can learn about the type and quantity of data that All of Us collects. Users can explore aggregate data including genomic variants, survey responses, physical measurements, electronic health record information, and wearables data. Registered users can use the Researcher Workbench to dive deeper into the data; conduct rapid, hypothesis-driven research; and build new methods for the future, using a variety of tools. The diverse data may help facilitate new studies that could help lead to new insights, treatments, and strategies for disease prevention that are tailored to individuals.',
            primary_dataset_scope: 'Program',
            poc: 'Support Center',
            poc_email: 'help@joinallofus.org',
            published_in: 'https://www.researchallofus.org/publications/',
            digest_type: 'manual',
            digest_date: '2024-08-01T19:49:32.000Z',
            case_age_at_diagnosis: [
              {
                n: 'Pediatric and Young Adult (<40 years)',
                k: 'Pediatric and Young Adult (<40 years)',
                v: 4961,
              },
            ],
            case_ethnicity: [
              {
                n: 'Hispanic or Latino',
                k: 'Hispanic or Latino',
                v: 1262,
              },
              {
                n: 'Not Hispanic or Latino',
                k: 'Not Hispanic or Latino',
                v: 3502,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 197,
              },
            ],
            case_id: 4961,
            case_race: [
              {
                n: 'Asian',
                k: 'Asian',
                v: 144,
              },
              {
                n: 'Black or African American',
                k: 'Black or African American',
                v: 775,
              },
              {
                n: 'More Than One Race',
                k: 'More Than One Race',
                v: 114,
              },
              {
                n: 'Other',
                k: 'Other',
                v: 97,
              },
              {
                n: 'White',
                k: 'White',
                v: 2594,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 1237,
              },
            ],
            case_sex: [
              {
                n: 'Female',
                k: 'Female',
                v: 3693,
              },
              {
                n: 'Male',
                k: 'Male',
                v: 1093,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 175,
              },
            ],
            case_disease_diagnosis: [
              {
                n: 'At Risk of Breast Cancer',
                k: 'At Risk of Breast Cancer',
                v: null,
              },
              {
                n: 'Basal Cell Carcinoma of Auricle of Ear',
                k: 'Basal Cell Carcinoma of Auricle of Ear',
                v: null,
              },
              {
                n: 'Basal Cell Carcinoma of Back',
                k: 'Basal Cell Carcinoma of Back',
                v: null,
              },
              {
                n: 'Basal Cell Carcinoma of Chest Wall',
                k: 'Basal Cell Carcinoma of Chest Wall',
                v: null,
              },
              {
                n: 'Basal Cell Carcinoma of Chin',
                k: 'Basal Cell Carcinoma of Chin',
                v: null,
              },
              {
                n: 'Basal Cell Carcinoma of Ear',
                k: 'Basal Cell Carcinoma of Ear',
                v: null,
              },
              {
                n: 'Basal Cell Carcinoma of Forehead',
                k: 'Basal Cell Carcinoma of Forehead',
                v: null,
              },
              {
                n: 'Basal Cell Carcinoma of Neck',
                k: 'Basal Cell Carcinoma of Neck',
                v: null,
              },
              {
                n: 'Basal Cell Carcinoma of Nose',
                k: 'Basal Cell Carcinoma of Nose',
                v: null,
              },
              {
                n: 'Basal Cell Carcinoma of Scalp',
                k: 'Basal Cell Carcinoma of Scalp',
                v: null,
              },
              {
                n: 'Basal Cell Carcinoma of Truncal Skin',
                k: 'Basal Cell Carcinoma of Truncal Skin',
                v: null,
              },
              {
                n: 'Basal Cell Carcinoma of Upper Eyelid',
                k: 'Basal Cell Carcinoma of Upper Eyelid',
                v: null,
              },
              {
                n: 'Breast Cancer Genetic Marker of Susceptibility Negative',
                k: 'Breast Cancer Genetic Marker of Susceptibility Negative',
                v: null,
              },
              {
                n: 'Breast Cancer Genetic Marker of Susceptibility Positive',
                k: 'Breast Cancer Genetic Marker of Susceptibility Positive',
                v: null,
              },
              {
                n: 'Cancer Antigen 19-9 Above Reference Range',
                k: 'Cancer Antigen 19-9 Above Reference Range',
                v: null,
              },
              {
                n: 'Cancer In Situ of Urinary Bladder',
                k: 'Cancer In Situ of Urinary Bladder',
                v: null,
              },
              {
                n: 'Carcinoma In Situ',
                k: 'Carcinoma In Situ',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Anal Canal',
                k: 'Carcinoma In Situ of Anal Canal',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Colon',
                k: 'Carcinoma In Situ of Colon',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Duodenum',
                k: 'Carcinoma In Situ of Duodenum',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Larynx',
                k: 'Carcinoma In Situ of Larynx',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Lung',
                k: 'Carcinoma In Situ of Lung',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Pancreas',
                k: 'Carcinoma In Situ of Pancreas',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Rectum',
                k: 'Carcinoma In Situ of Rectum',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Skin of Ear',
                k: 'Carcinoma In Situ of Skin of Ear',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Skin of Face',
                k: 'Carcinoma In Situ of Skin of Face',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Skin of Neck',
                k: 'Carcinoma In Situ of Skin of Neck',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Skin of Scalp',
                k: 'Carcinoma In Situ of Skin of Scalp',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Skin of Trunk',
                k: 'Carcinoma In Situ of Skin of Trunk',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Thyroid Gland',
                k: 'Carcinoma In Situ of Thyroid Gland',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Uterus',
                k: 'Carcinoma In Situ of Uterus',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Vagina',
                k: 'Carcinoma In Situ of Vagina',
                v: null,
              },
              {
                n: 'Carcinoma In Situ of Vulva',
                k: 'Carcinoma In Situ of Vulva',
                v: null,
              },
              {
                n: 'Carcinoma of Colon',
                k: 'Carcinoma of Colon',
                v: null,
              },
              {
                n: 'Carcinoma of Prostate',
                k: 'Carcinoma of Prostate',
                v: null,
              },
              {
                n: 'Chronic Pain Due To Malignant Neoplastic Disease',
                k: 'Chronic Pain Due To Malignant Neoplastic Disease',
                v: null,
              },
              {
                n: 'Familial Cancer of Breast',
                k: 'Familial Cancer of Breast',
                v: null,
              },
              {
                n: 'Figo Endometrial Carcinoma Stage III',
                k: 'Figo Endometrial Carcinoma Stage III',
                v: null,
              },
              {
                n: 'Hereditary Cancer-Predisposing Syndrome',
                k: 'Hereditary Cancer-Predisposing Syndrome',
                v: null,
              },
              {
                n: 'Hereditary Non-Polyposis Colon Cancer Gene Mutation Positive',
                k: 'Hereditary Non-Polyposis Colon Cancer Gene Mutation Positive',
                v: null,
              },
              {
                n: 'Hurthle Cell Carcinoma of Thyroid',
                k: 'Hurthle Cell Carcinoma of Thyroid',
                v: null,
              },
              {
                n: 'Increased Cancer Antigen 125',
                k: 'Increased Cancer Antigen 125',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Anterior Mediastinum',
                k: 'Malignant Neoplasm of Anterior Mediastinum',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Carotid Body',
                k: 'Malignant Neoplasm of Carotid Body',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Cerebellum',
                k: 'Malignant Neoplasm of Cerebellum',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Cerebral Meninges',
                k: 'Malignant Neoplasm of Cerebral Meninges',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Digestive System',
                k: 'Malignant Neoplasm of Digestive System',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Intraabdominal Organ',
                k: 'Malignant Neoplasm of Intraabdominal Organ',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Lateral Wall of Oropharynx',
                k: 'Malignant Neoplasm of Lateral Wall of Oropharynx',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Liver',
                k: 'Malignant Neoplasm of Liver',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Mandible',
                k: 'Malignant Neoplasm of Mandible',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Posterior Mediastinum',
                k: 'Malignant Neoplasm of Posterior Mediastinum',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Respiratory System',
                k: 'Malignant Neoplasm of Respiratory System',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Skin',
                k: 'Malignant Neoplasm of Skin',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Soft Tissue of Orbit',
                k: 'Malignant Neoplasm of Soft Tissue of Orbit',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Upper Respiratory Tract',
                k: 'Malignant Neoplasm of Upper Respiratory Tract',
                v: null,
              },
              {
                n: 'Malignant Neoplasm of Urinary Organ',
                k: 'Malignant Neoplasm of Urinary Organ',
                v: null,
              },
              {
                n: 'Malignant Neoplastic Disease',
                k: 'Malignant Neoplastic Disease',
                v: null,
              },
              {
                n: 'Malignant Neoplastic Disease In Mother Complicating Childbirth',
                k: 'Malignant Neoplastic Disease In Mother Complicating Childbirth',
                v: null,
              },
              {
                n: 'Malignant Tumor of Anal Canal',
                k: 'Malignant Tumor of Anal Canal',
                v: null,
              },
              {
                n: 'Malignant Tumor of Breast',
                k: 'Malignant Tumor of Breast',
                v: null,
              },
              {
                n: 'Malignant Tumor of Cecum',
                k: 'Malignant Tumor of Cecum',
                v: null,
              },
              {
                n: 'Malignant Tumor of Colon',
                k: 'Malignant Tumor of Colon',
                v: null,
              },
              {
                n: 'Malignant Tumor of Duodenum',
                k: 'Malignant Tumor of Duodenum',
                v: null,
              },
              {
                n: 'Malignant Tumor of Esophagus',
                k: 'Malignant Tumor of Esophagus',
                v: null,
              },
              {
                n: 'Malignant Tumor of Floor of Mouth',
                k: 'Malignant Tumor of Floor of Mouth',
                v: null,
              },
              {
                n: 'Malignant Tumor of Glans Penis',
                k: 'Malignant Tumor of Glans Penis',
                v: null,
              },
              {
                n: 'Malignant Tumor of Hepatic Flexure',
                k: 'Malignant Tumor of Hepatic Flexure',
                v: null,
              },
              {
                n: 'Malignant Tumor of Ill-Defined Site',
                k: 'Malignant Tumor of Ill-Defined Site',
                v: null,
              },
              {
                n: 'Malignant Tumor of Larynx',
                k: 'Malignant Tumor of Larynx',
                v: null,
              },
              {
                n: 'Malignant Tumor of Lip',
                k: 'Malignant Tumor of Lip',
                v: null,
              },
              {
                n: 'Malignant Tumor of Lung',
                k: 'Malignant Tumor of Lung',
                v: null,
              },
              {
                n: 'Malignant Tumor of Nasopharynx',
                k: 'Malignant Tumor of Nasopharynx',
                v: null,
              },
              {
                n: 'Malignant Tumor of Oral Cavity',
                k: 'Malignant Tumor of Oral Cavity',
                v: null,
              },
              {
                n: 'Malignant Tumor of Oropharynx',
                k: 'Malignant Tumor of Oropharynx',
                v: null,
              },
              {
                n: 'Malignant Tumor of Ovary',
                k: 'Malignant Tumor of Ovary',
                v: null,
              },
              {
                n: 'Malignant Tumor of Palate',
                k: 'Malignant Tumor of Palate',
                v: null,
              },
              {
                n: 'Malignant Tumor of Pancreas',
                k: 'Malignant Tumor of Pancreas',
                v: null,
              },
              {
                n: 'Malignant Tumor of Parathyroid Gland',
                k: 'Malignant Tumor of Parathyroid Gland',
                v: null,
              },
              {
                n: 'Malignant Tumor of Parotid Gland',
                k: 'Malignant Tumor of Parotid Gland',
                v: null,
              },
              {
                n: 'Malignant Tumor of Penis',
                k: 'Malignant Tumor of Penis',
                v: null,
              },
              {
                n: 'Malignant Tumor of Peripheral Nerve',
                k: 'Malignant Tumor of Peripheral Nerve',
                v: null,
              },
              {
                n: 'Malignant Tumor of Peritoneum',
                k: 'Malignant Tumor of Peritoneum',
                v: null,
              },
              {
                n: 'Malignant Tumor of Pharynx',
                k: 'Malignant Tumor of Pharynx',
                v: null,
              },
              {
                n: 'Malignant Tumor of Pineal Gland',
                k: 'Malignant Tumor of Pineal Gland',
                v: null,
              },
              {
                n: 'Malignant Tumor of Pleura',
                k: 'Malignant Tumor of Pleura',
                v: null,
              },
              {
                n: 'Malignant Tumor of Rectum',
                k: 'Malignant Tumor of Rectum',
                v: null,
              },
              {
                n: 'Malignant Tumor of Scrotum',
                k: 'Malignant Tumor of Scrotum',
                v: null,
              },
              {
                n: 'Malignant Tumor of Stomach',
                k: 'Malignant Tumor of Stomach',
                v: null,
              },
              {
                n: 'Malignant Tumor of Thyroid Gland',
                k: 'Malignant Tumor of Thyroid Gland',
                v: null,
              },
              {
                n: 'Malignant Tumor of Trachea',
                k: 'Malignant Tumor of Trachea',
                v: null,
              },
              {
                n: 'Malignant Tumor of Undescended Testis',
                k: 'Malignant Tumor of Undescended Testis',
                v: null,
              },
              {
                n: 'Malignant Tumor of Urethra',
                k: 'Malignant Tumor of Urethra',
                v: null,
              },
              {
                n: 'Malignant Tumor of Vulva',
                k: 'Malignant Tumor of Vulva',
                v: null,
              },
              {
                n: 'Mesothelioma of Peritoneum',
                k: 'Mesothelioma of Peritoneum',
                v: null,
              },
              {
                n: 'Overlapping Malignant Neoplasm of Brain',
                k: 'Overlapping Malignant Neoplasm of Brain',
                v: null,
              },
              {
                n: 'Overlapping Malignant Neoplasm of Eye and Adnexa (Primary)',
                k: 'Overlapping Malignant Neoplasm of Eye and Adnexa (Primary)',
                v: null,
              },
              {
                n: 'Overlapping Malignant Neoplasm of Palate',
                k: 'Overlapping Malignant Neoplasm of Palate',
                v: null,
              },
              {
                n: 'Overlapping Malignant Neoplasm of Penis',
                k: 'Overlapping Malignant Neoplasm of Penis',
                v: null,
              },
              {
                n: 'Primary Differentiated Carcinoma of Thyroid Gland',
                k: 'Primary Differentiated Carcinoma of Thyroid Gland',
                v: null,
              },
              {
                n: 'Primary Malignant Neoplasm of Appendix',
                k: 'Primary Malignant Neoplasm of Appendix',
                v: null,
              },
              {
                n: 'Primary Malignant Neoplasm of Bronchus',
                k: 'Primary Malignant Neoplasm of Bronchus',
                v: null,
              },
              {
                n: 'Primary Malignant Neoplasm of Clitoris',
                k: 'Primary Malignant Neoplasm of Clitoris',
                v: null,
              },
              {
                n: 'Primary Malignant Neoplasm of Endocervix',
                k: 'Primary Malignant Neoplasm of Endocervix',
                v: null,
              },
              {
                n: 'Primary Malignant Neoplasm of Endometrium',
                k: 'Primary Malignant Neoplasm of Endometrium',
                v: null,
              },
              {
                n: 'Primary Malignant Neoplasm of Lung',
                k: 'Primary Malignant Neoplasm of Lung',
                v: null,
              },
              {
                n: 'Primary Malignant Neoplasm of Vulva',
                k: 'Primary Malignant Neoplasm of Vulva',
                v: null,
              },
              {
                n: 'Recurrent Malignant Neoplastic Disease',
                k: 'Recurrent Malignant Neoplastic Disease',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Bone Marrow',
                k: 'Secondary Malignant Neoplasm of Bone Marrow',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Brain',
                k: 'Secondary Malignant Neoplasm of Brain',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Central Nervous System',
                k: 'Secondary Malignant Neoplasm of Central Nervous System',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Cerebral Meninges',
                k: 'Secondary Malignant Neoplasm of Cerebral Meninges',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Female Genital Organ',
                k: 'Secondary Malignant Neoplasm of Female Genital Organ',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Intra-Abdominal Organs',
                k: 'Secondary Malignant Neoplasm of Intra-Abdominal Organs',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Lung',
                k: 'Secondary Malignant Neoplasm of Lung',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Lymph Node',
                k: 'Secondary Malignant Neoplasm of Lymph Node',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Lymph Nodes of Head',
                k: 'Secondary Malignant Neoplasm of Lymph Nodes of Head',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Lymph Nodes of Multiple Sites',
                k: 'Secondary Malignant Neoplasm of Lymph Nodes of Multiple Sites',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Lymph Nodes of Neck',
                k: 'Secondary Malignant Neoplasm of Lymph Nodes of Neck',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Mediastinum',
                k: 'Secondary Malignant Neoplasm of Mediastinum',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Nervous System',
                k: 'Secondary Malignant Neoplasm of Nervous System',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Pleura',
                k: 'Secondary Malignant Neoplasm of Pleura',
                v: null,
              },
              {
                n: 'Secondary Malignant Neoplasm of Urinary System',
                k: 'Secondary Malignant Neoplasm of Urinary System',
                v: null,
              },
              {
                n: 'Squamous Cell Carcinoma In Situ of Skin',
                k: 'Squamous Cell Carcinoma In Situ of Skin',
                v: null,
              },
              {
                n: 'Squamous Cell Carcinoma of Back',
                k: 'Squamous Cell Carcinoma of Back',
                v: null,
              },
              {
                n: 'Squamous Cell Carcinoma of Scalp',
                k: 'Squamous Cell Carcinoma of Scalp',
                v: null,
              },
              {
                n: 'Squamous Cell Carcinoma of Skin of Ear',
                k: 'Squamous Cell Carcinoma of Skin of Ear',
                v: null,
              },
              {
                n: 'Squamous Cell Carcinoma of Skin of Face',
                k: 'Squamous Cell Carcinoma of Skin of Face',
                v: null,
              },
              {
                n: 'Squamous Cell Carcinoma of Skin of Lower Extremity',
                k: 'Squamous Cell Carcinoma of Skin of Lower Extremity',
                v: null,
              },
              {
                n: 'Squamous Cell Carcinoma of Skin of Neck',
                k: 'Squamous Cell Carcinoma of Skin of Neck',
                v: null,
              },
              {
                n: 'Stool DNA-Based Colorectal Cancer Screening Positive',
                k: 'Stool DNA-Based Colorectal Cancer Screening Positive',
                v: null,
              },
              {
                n: 'Triple-Negative Breast Cancer',
                k: 'Triple-Negative Breast Cancer',
                v: null,
              },
              {
                n: 'Widespread Metastatic Malignant Neoplastic Disease',
                k: 'Widespread Metastatic Malignant Neoplastic Disease',
                v: null,
              },
            ],
            additional: [
              {
                attr_name: 'Data Repository',
                attr_set: [
                  {
                    k: 'https://databrowser.researchallofus.org/',
                    v: -1,
                  },
                ],
              },
            ],
          },
        },
        {
          content: {
            data_resource_name: 'cBioPortal',
            data_resource_id: 'cBioPortal',
            dataset_id: 'cBioPortal-St_Jude_2015',
            dataset_name: 'ALL St. Jude 2015',
            desc: 'Comprehensive profiling of infant MLL-rearranged acute lymphoblastic leukemia (MLL-R ALL).',
            primary_dataset_scope: 'Project',
            poc: 'James R. Downing',
            poc_email: 'james.downing@stjude.org',
            published_in: 'https://doi.org/10.1038/ng.3230',
            digest_type: 'manual',
            digest_date: '2024-08-01T19:51:15.000Z',
            case_age_at_diagnosis: [
              {
                n: '0 to 4 years',
                k: '0 to 4 years',
                v: 73,
              },
              {
                n: '5 to 9 years',
                k: '5 to 9 years',
                v: 3,
              },
              {
                n: '10 to 14 years',
                k: '10 to 14 years',
                v: 10,
              },
              {
                n: '15 to 19 years',
                k: '15 to 19 years',
                v: 7,
              },
            ],
            case_ethnicity: [
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 93,
              },
            ],
            case_id: 93,
            case_race: [
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 93,
              },
            ],
            case_sex: [
              {
                n: 'Female',
                k: 'Female',
                v: 46,
              },
              {
                n: 'Male',
                k: 'Male',
                v: 47,
              },
            ],
            sample_id: 93,
            sample_assay_method: [
              {
                n: 'Targeted Sequencing',
                k: 'Targeted Sequencing',
                v: 49,
              },
              {
                n: 'Whole Exome Sequencing',
                k: 'Whole Exome Sequencing',
                v: 20,
              },
              {
                n: 'Whole Genome Sequencing',
                k: 'Whole Genome Sequencing',
                v: 24,
              },
            ],
            case_disease_diagnosis: [
              {
                n: 'Acute Lymphoblastic Leukemia',
                k: 'Acute Lymphoblastic Leukemia',
                v: 3,
                s: [
                  'Acute Lymphoblastic Leukemia',
                  'Acute Lymphocytic Leukaemia',
                  'Acute Lymphocytic Leukemia',
                  'Acute Lymphocytic Leukemias',
                  'Acute Lymphogenous Leukemia',
                  'Acute Lymphoid Leukemia',
                  'ALL',
                  'ALL - Acute Lymphocytic Leukemia',
                  'Lymphoblastic Leukemia',
                  'Precursor Cell Lymphoblastic Leukemia',
                  'Precursor Lymphoblastic Leukemia',
                ],
              },
              {
                n: 'Acute Myeloid Leukemia',
                k: 'Acute Myeloid Leukemia',
                v: 10,
                s: [
                  'Acute Myeloblastic Leukemia',
                  'Acute Myelocytic Leukemia',
                  'Acute Myelogenous Leukemia',
                  'Acute Myelogenous Leukemias',
                  'Acute Myeloid Leukemia',
                  'Acute Nonlymphocytic Leukemia',
                  'AML',
                  'AML - Acute Myeloid Leukemia',
                  'ANLL',
                  'Hematopoeitic - Acute Myleogenous Leukemia (AML)',
                ],
              },
              {
                n: 'Acute Undifferentiated Leukemia',
                k: 'Acute Undifferentiated Leukemia',
                v: 1,
              },
              {
                n: 'B-Cell Acute Lymphoid Leukemia',
                k: 'B-Cell Acute Lymphoid Leukemia',
                v: 70,
              },
              {
                n: 'Leukemia',
                k: 'Leukemia',
                v: 1,
              },
              {
                n: 'T-Cell Acute Lymphoid Leukemia',
                k: 'T-Cell Acute Lymphoid Leukemia',
                v: 8,
              },
            ],
            case_tumor_site: [
              {
                n: 'Blood',
                k: 'Blood',
                v: 93,
                s: [
                  'Blood',
                  'Reticuloendothelial System, Blood',
                ],
              },
            ],
            additional: [
              {
                attr_name: 'Data Repository',
                attr_set: [
                  {
                    k: 'https://www.cbioportal.org/study/summary?id=all_stjude_2015',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Grant ID',
                attr_set: [
                  {
                    k: 'P30CA021765',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Grant Name',
                attr_set: [
                  {
                    k: 'St. Jude Cancer Center Support Grant',
                    v: -1,
                  },
                ],
              },
            ],
          },
        },
        {
          content: {
            data_resource_name: 'cBioPortal',
            data_resource_id: 'cBioPortal',
            dataset_id: 'cBioPortal-St_Jude_2016',
            dataset_name: 'ALL St. Jude 2016',
            desc: 'Whole-genome and/or whole-exome sequencing of ERG-altered B-ALL tumor/normal pairs.',
            primary_dataset_scope: 'Project',
            poc: 'Charles G. Mullighan',
            poc_email: 'charles.mullighan@stjude.org',
            published_in: 'https://doi.org/10.1038/ng.3691',
            digest_type: 'manual',
            digest_date: '2024-08-01T19:51:15.000Z',
            case_age_at_diagnosis: [
              {
                n: '0 to 4 years',
                k: '0 to 4 years',
                v: 8,
              },
              {
                n: '5 to 9 years',
                k: '5 to 9 years',
                v: 12,
              },
              {
                n: '10 to 14 years',
                k: '10 to 14 years',
                v: 22,
              },
              {
                n: '15 to 19 years',
                k: '15 to 19 years',
                v: 27,
              },
              {
                n: '20 to 24 years',
                k: '20 to 24 years',
                v: 3,
              },
              {
                n: '25 to 29 years',
                k: '25 to 29 years',
                v: 1,
              },
            ],
            case_ethnicity: [
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 73,
              },
            ],
            case_id: 73,
            case_race: [
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 73,
              },
            ],
            case_sex: [
              {
                n: 'Female',
                k: 'Female',
                v: 30,
              },
              {
                n: 'Male',
                k: 'Male',
                v: 42,
              },
              {
                n: 'Not Reported',
                k: 'Not Reported',
                v: 1,
              },
            ],
            sample_id: 73,
            sample_assay_method: [
              {
                n: 'Whole Exome Sequencing',
                k: 'Whole Exome Sequencing',
                v: 43,
              },
              {
                n: 'Whole Genome Sequencing',
                k: 'Whole Genome Sequencing',
                v: 30,
              },
            ],
            case_disease_diagnosis: [
              {
                n: 'Acute Lymphoid Leukemia',
                k: 'Acute Lymphoid Leukemia',
                v: 73,
                s: [
                  'Acute Lymphoblastic Leukemia',
                  'Acute Lymphocytic Leukaemia',
                  'Acute Lymphocytic Leukemia',
                  'Acute Lymphocytic Leukemias',
                  'Acute Lymphogenous Leukemia',
                  'Acute Lymphoid Leukemia',
                  'ALL',
                  'ALL - Acute Lymphocytic Leukemia',
                  'Lymphoblastic Leukemia',
                  'Precursor Cell Lymphoblastic Leukemia',
                  'Precursor Lymphoblastic Leukemia',
                ],
              },
            ],
            case_tumor_site: [
              {
                n: 'Blood',
                k: 'Blood',
                v: 73,
                s: [
                  'Blood',
                  'Reticuloendothelial System, Blood',
                ],
              },
            ],
            additional: [
              {
                attr_name: 'Data Repository',
                attr_set: [
                  {
                    k: 'https://www.cbioportal.org/study/summary?id=all_stjude_2016',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Grant ID',
                attr_set: [
                  {
                    k: 'P30CA021765',
                    v: -1,
                  },
                ],
              },
              {
                attr_name: 'Grant Name',
                attr_set: [
                  {
                    k: 'St. Jude Cancer Center Support Grant',
                    v: -1,
                  },
                ],
              },
            ],
          },
        },
      ],
      aggs: 'all',
    },
  };
}

export default searchDocument;
