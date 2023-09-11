import { API_PATH } from '@enums/pathApi';
import { AuthorType } from '@types';

export const addAuthor = async (authorName: string, token: string) => {
  const response = await fetch(`${API_PATH}/authors/add`, {
    method: 'POST',
    body: JSON.stringify({
      name: authorName,
    }),
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  const responseToJson = await response.json();
  return responseToJson.result as AuthorType;
};
