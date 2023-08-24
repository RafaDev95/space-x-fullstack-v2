'use client'

type Props = {
  title: string
}

const EmptyState = ({ title }: Props) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center rounded-md bg-card p-3">
      <p className="text-red-500">{title}</p>
    </div>
  )
}
export default EmptyState
