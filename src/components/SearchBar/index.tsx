import './searchBar.css';
import React from 'react';

export interface HeaderProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SearchBar({ value, onChange, onSubmit }: HeaderProps) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Buscar productos"
        value={value}
        onChange={onChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            fill="white"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.6666 6.66671C8.45751 6.66671 6.66665 8.45757 6.66665 10.6667C6.66665 12.8758 8.45751 14.6667 10.6666 14.6667C12.8758 14.6667 14.6666 12.8758 14.6666 10.6667C14.6666 8.45757 12.8758 6.66671 10.6666 6.66671ZM5.33331 10.6667C5.33331 7.72119 7.72113 5.33337 10.6666 5.33337C13.6122 5.33337 16 7.72119 16 10.6667C16 11.8992 15.5819 13.034 14.8799 13.9371L18.4714 17.5286C18.7317 17.789 18.7317 18.2111 18.4714 18.4714C18.211 18.7318 17.7889 18.7318 17.5286 18.4714L13.9371 14.8799C13.034 15.582 11.8991 16 10.6666 16C7.72113 16 5.33331 13.6122 5.33331 10.6667Z"
          />
        </svg>
      </button>
    </form>
  );
}
