import { AnimatedText } from '@/components/AnimatedText'
import { SearchBar } from '@/components/SearchBar'
import clsx from 'clsx'
import React, { useState } from 'react'
import { SearchResult, SearchResultProps } from '../SearchResult'
// Import icons
import { BsFileEarmarkMusicFill, BsFileEarmarkPlayFill } from 'react-icons/bs'
import { FaFileAlt, FaFilePdf, FaImage } from 'react-icons/fa'
import { Button } from '../Buttons/Button'

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
  const [fileTypeFilter, setFileTypeFilter] = useState<string | null>(null)

  // Handle filter button function
  const handleFilterChange = (type: string | null) => {
    setFileTypeFilter(type)
  }

  // Filter the results based on the selected filter type
  const filteredResults = fileTypeFilter
    ? results?.filter((file) => file.type === fileTypeFilter)
    : results

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
        <Button
          label="Docs"
          icon={<FaFileAlt color="blue" />}
          onClick={() => handleFilterChange('document')}
        />
        <Button
          label="PDF"
          icon={<FaFilePdf color="red" />}
          onClick={() => handleFilterChange('pdf')}
        />
        <Button
          label="Images"
          icon={<FaImage color="#fe5a55" />}
          onClick={() => handleFilterChange('image')}
        />
        <Button
          label="MP3/Audio"
          icon={<BsFileEarmarkMusicFill color="orange" />}
          onClick={() => handleFilterChange('audio')}
        />
        <Button
          label="MP4/Video"
          icon={<BsFileEarmarkPlayFill color="#8ba3fe" />}
          onClick={() => handleFilterChange('video')}
        />
        <Button
          label="Clear Filter"
          icon={null}
          onClick={() => handleFilterChange('')}
        />
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
            files={filteredResults}
            hideList={compact}
            compactOverview={compact}
          />
        )}
      </div>
    </div>
  )
}
