/**
 * Interface representing a user entity.
 */
export interface User {
  id: string;
  userName: string;
  password: string;
  roles: string[];
}
