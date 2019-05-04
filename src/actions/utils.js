const UNKNOWN_LANG = 'Unknown';
const DEFAULT_DESC = 'No description';

export function formatGistList(respArr, username) {
  return respArr.map(gist => {
    const { files, description, id } = gist;

    const fileTypes = [];
    for (var key in files) {
      if (files.hasOwnProperty(key)) {
        const file = files[key];
        const name = file.language || UNKNOWN_LANG;
        fileTypes.push({ name, shortname: shortName(name) })
      }
    }

    return {
      id,
      username,
      name: description || DEFAULT_DESC,
      fileTypes,
      forks: [],
      loading: true
    }
  });
}

export function formatForkList(respArr, id) {
  const forks = respArr.map(fork => {
    const { avatar_url, login } = fork.owner;
    return { avatar_url, name: login }
  });

  return { forks: forks || [], id };
}

const shortName = name => (name.length > 2) ? name.substring(0, 2).toUpperCase() : name || '-'
