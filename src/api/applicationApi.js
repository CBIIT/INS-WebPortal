import { handleResponse, handleError } from './apiUtils';

const baseUrl = 'https://datacatalog-dev.ccdi.cancer.gov/service/application';

export function getApplicationVersionInfo() {
  return {
    status: 'success',
    data: {
      softwareVersion: 'dev-1.4.9',
      siteDataUpdate: '08/01/2024',
    },
  };
}

export function getWidgetUpdates() {
  return fetch(`${baseUrl}/widgetupdate`)
    .then(handleResponse)
    .catch(handleError);
}

export function getSiteUpdates(body) {
  return fetch(`${baseUrl}/siteupdate`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(handleResponse)
    .catch(handleError);
}

export function getGlossaryTerms(body) {
  return {
    status: 'success',
    definitions: {
      Program: "A coherent assembly of plans, project activities, and supporting resources contained within an administrative framework, the purpose of which is to implement an organization's mission or some specific program-related aspect of that mission.",
      Project: 'Any specifically defined piece of work that is undertaken or attempted to meet the goals of a program and that involves one or more case studies. Also known as a Study or Trial. ',
    },
  };
}

export function getGlossaryTermsByFirstLetter(body) {
  return fetch(`${baseUrl}/glossaryTermsByFirstLetter`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(handleResponse)
    .catch(handleError);
}

export function getGlossaryLetters() {
  return fetch(`${baseUrl}/glossaryLetters`)
    .then(handleResponse)
    .catch(handleError);
}

export default getApplicationVersionInfo;
