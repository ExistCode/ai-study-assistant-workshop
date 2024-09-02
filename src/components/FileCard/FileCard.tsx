'use client'
import {
  Accordion,
  AccordionItem,
  AccordionItemProps,
  AccordionProps,
  Chip,
} from '@nextui-org/react'
import React from 'react'

export type FileCardProps = {
  name: string
  extension: string
  icon: React.ReactNode
  excerpt?: string
  tags?: string[]

  itemProps?: Partial<AccordionItemProps>
} & Partial<AccordionProps>

export const FileCard: React.FC<FileCardProps & { itemPath?: string }> = ({
  name,
  extension,
  icon,
  tags,
  excerpt,
  itemProps = {},
  itemPath,
  ...props
}) => {
  const displayName =
    !!extension && name.endsWith(extension)
      ? name.slice(0, name.length - (extension || '').length)
      : name
  const extensionChip = extension ? (
    <Chip color="primary" size="sm" radius="full" className="ms-2 opacity-90">
      {extension}
    </Chip>
  ) : null
  const title = (
    <>
      {displayName}
      {extensionChip}
    </>
  )

  const iconComponent = (
    <div className="w-6 h-6 flex items-center justify-center fill-primary-500">
      {icon}
    </div>
  )

  const startContent = (
    <div className="flex flex-row items-center">
      {itemProps.startContent}
      {iconComponent}
    </div>
  )

  const subtitle = (
    <div className="flex flex-row items-center justify-between">
      <div className="w-0 flex-grow pe-8 whitespace-nowrap overflow-hidden overflow-ellipsis">
        {excerpt || displayName}
      </div>
      <div className="flex flex-row gap-1">
        {(tags || []).slice(0, 2).map((tag, index) => (
          <Chip key={index} size="sm" radius="full">
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  )

  const previewContent = (itemPath?: string) => {
    switch (extension?.toLowerCase()) {
      case '.jpg':
      case '.png':
      case '.gif':
      case '.jpeg':
        return (
          <img
            src={itemPath}
            alt={name}
            width={400}
            height={320}
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        )
      case '.mp4':
      case '.mov':
      case '.avi':
        return <video src={itemPath} controls width={400} height={320} />
      default:
        return null
    }
  }

  return (
    <Accordion>
      <AccordionItem
        title={title}
        subtitle={subtitle}
        {...itemProps}
        startContent={startContent}
        key={1}
      >
        {previewContent(itemPath)}
      </AccordionItem>
    </Accordion>
  )
}
