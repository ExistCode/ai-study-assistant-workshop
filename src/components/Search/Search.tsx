import { AnimatedText } from '@/components/AnimatedText'
import { SearchBar } from '@/components/SearchBar'
import clsx from 'clsx'
import React from 'react'
import { SearchResult, SearchResultProps } from '../SearchResult'
// Import icons
import { BsFileEarmarkMusicFill, BsFileEarmarkPlayFill } from 'react-icons/bs'
import { FaFileAlt, FaFilePdf, FaImage } from 'react-icons/fa'

export type SearchProps = {
  query?: string
  onQueryChange?: (query: string) => void

  searching?: boolean
  results?: SearchResultProps['files']
  onSearch?: (query: string) => void

  selectedFiles?: SearchResultProps['selected']
  onSelect?: SearchResultProps['onSelect']

  compact?: boolean
}

export const Search: React.FC<SearchProps> = ({
  query,
  onQueryChange,
  searching,
  results,
  onSearch,
  selectedFiles,
  onSelect,
  compact,
}) => {
  return (
    <div className="flex flex-col">
      <SearchBar
        className={clsx(
          'transition',
          'mb-10',
          compact && ['opacity-0', 'invisible', 'h-0', 'mb-0'],
        )}
        value={query}
        pending={searching}
        onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
        onSubmit={() => {
          onSearch && onSearch(query || '')
        }}
      />

      {/* Row of Buttons */}
      <div className="flex justify-center space-x-4 mb-4 pb-2">
        <button className="flex items-center space-x-2 p-2 border rounded-large shadow-md hover:bg-gray-200">
          <FaFileAlt color="blue" />
          <span>Docs</span>
        </button>
        <button className="flex items-center space-x-2 p-2 border rounded-large shadow-md hover:bg-gray-200">
          <FaFilePdf color="red" />
          <span>PDF</span>
        </button>
        <button className="flex items-center space-x-2 p-2 border rounded-large shadow-md hover:bg-gray-200">
          <FaImage color="#fe5a55" />
          <span>Images</span>
        </button>
        <button className="flex items-center space-x-2 p-2 border rounded-large shadow-md hover:bg-gray-200">
          <BsFileEarmarkMusicFill color="orange" />
          <span>MP3/Audio</span>
        </button>
        <button className="flex items-center space-x-2 p-2 border rounded-large shadow-md hover:bg-gray-200">
          <BsFileEarmarkPlayFill color="#8ba3fe" />
          <span>MP4/Video</span>
        </button>
      </div>

      <div>
        {typeof results !== 'undefined' && (
          <SearchResult
            title={
              <div className="flex flex-row items-center gap-2">
                <AnimatedText
                  maxTime={500}
                  text={compact ? query! : 'Search results'}
                />
              </div>
            }
            description={
              <AnimatedText
                maxTime={500}
                text={
                  compact
                    ? `Ask me anything to help with your studies!`
                    : `Select at least one file to start a new conversation.`
                }
              />
            }
            selected={selectedFiles}
            onSelect={onSelect}
            files={results}
            hideList={compact}
            compactOverview={compact}
          />
        )}
      </div>
    </div>
  )
}
