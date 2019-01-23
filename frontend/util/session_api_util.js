export const signup = user => {
  return $.ajax({
    method: 'POST',
    url: '/api/user',
    data: {user},
    error: errors => errors
  });
};

export const login = user => {
  return $.ajax({
    method: 'POST',
    url: '/api/session',
    data: {user},
    error: errors => errors
  });
};

export const logout = () => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/session',
    error: errors => errors
  });
};