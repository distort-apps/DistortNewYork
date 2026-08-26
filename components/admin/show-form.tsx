'use client'

import { useActionState, useRef, useState } from 'react'
import type { Venue } from '@/lib/shows'
import { createShowAction, updateShowAction } from '@/actions/admin/shows'
import { postSubmissionAction } from '@/actions/admin/submissions'
import classes from './show-form.module.css'

export type ShowFormDefaults = {
  id?: string
  title?: string
  date?: Date | string | null
  genre?: string
  excerpt?: string
  time?: string
  price?: string
  image?: string
  ticketUrl?: string
  previewUrl?: string
  previewTrack?: string
  isFeatured?: boolean
  rating?: number
  venueId?: string
}

type Props = {
  mode: 'create' | 'edit' | 'submission'
  venues: Pick<Venue, 'id' | 'name'>[]
  defaults?: ShowFormDefaults
  contactId?: string
}

type FieldKey =
  | 'title'
  | 'date'
  | 'venueId'
  | 'newVenueName'
  | 'image'
  | 'imageUrl'
  | 'ticketUrl'
  | 'previewUrl'
  | 'rating'

type FieldErrors = Partial<Record<FieldKey, string>>

const MAX_IMAGE_BYTES = 10 * 1024 * 1024

function toDateInputValue(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d
  if (isNaN(date.getTime())) return ''
  const tz = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - tz).toISOString().slice(0, 10)
}

function isValidUrl(v: string): boolean {
  try {
    const u = new URL(v)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export default function ShowForm({ mode, venues, defaults, contactId }: Props) {
  const action =
    mode === 'create'
      ? createShowAction
      : mode === 'edit'
        ? updateShowAction
        : postSubmissionAction
  const [state, formAction, pending] = useActionState(action, {})

  const [title, setTitle] = useState(defaults?.title ?? '')
  const [genre, setGenre] = useState(defaults?.genre ?? '')
  const [excerpt, setExcerpt] = useState(defaults?.excerpt ?? '')
  const [date, setDate] = useState(
    defaults?.date ? toDateInputValue(defaults.date) : '',
  )
  const [time, setTime] = useState(defaults?.time ?? '')
  const [price, setPrice] = useState(defaults?.price ?? '')
  const [venueSelection, setVenueSelection] = useState<string>(defaults?.venueId ?? '')
  const [newVenueName, setNewVenueName] = useState('')
  const [imageUrl, setImageUrl] = useState(defaults?.image ?? '')
  const [ticketUrl, setTicketUrl] = useState(defaults?.ticketUrl ?? '')
  const [previewUrl, setPreviewUrl] = useState(defaults?.previewUrl ?? '')
  const [previewTrack, setPreviewTrack] = useState(defaults?.previewTrack ?? '')
  const [isFeatured, setIsFeatured] = useState(defaults?.isFeatured ?? false)
  const [rating, setRating] = useState<string>(String(defaults?.rating ?? 0))

  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [errors, setErrors] = useState<FieldErrors>({})

  const previewSrc = filePreview || imageUrl
  const creatingVenue = venueSelection === '__new__'
  const requiresImage = mode === 'create' || mode === 'submission'
  const submitLabel =
    mode === 'create'
      ? 'Create show'
      : mode === 'edit'
        ? 'Save changes'
        : 'Post show'

  const clearError = (key: FieldKey) => {
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleFile = (file: File | null) => {
    if (!file) {
      setFilePreview(null)
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      if (fileInputRef.current) fileInputRef.current.value = ''
      setFilePreview(null)
      setErrors((prev) => ({
        ...prev,
        image: `Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max is 10 MB — try resizing it first.`,
      }))
      return
    }
    const url = URL.createObjectURL(file)
    setFilePreview(url)
    clearError('image')
  }

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    if (fileInputRef.current) {
      const dt = new DataTransfer()
      dt.items.add(file)
      fileInputRef.current.files = dt.files
    }
    handleFile(file)
  }

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {}
    if (!title.trim()) errs.title = 'Title is required.'
    if (!date) errs.date = 'Date is required.'
    else if (isNaN(new Date(date).getTime())) errs.date = 'Invalid date.'
    if (!venueSelection) errs.venueId = 'Pick a venue.'
    if (creatingVenue && !newVenueName.trim()) {
      errs.newVenueName = 'New venue name is required.'
    }

    const file = fileInputRef.current?.files?.[0] ?? null
    const hasFile = !!file
    if (requiresImage && !hasFile && !imageUrl.trim()) {
      errs.image = 'An image is required (file or URL).'
    }
    if (file && file.size > MAX_IMAGE_BYTES) {
      errs.image = `Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max is 10 MB.`
    }

    if (imageUrl.trim() && !isValidUrl(imageUrl)) {
      errs.imageUrl = 'Must be a valid http(s) URL.'
    }
    if (ticketUrl.trim() && !isValidUrl(ticketUrl)) {
      errs.ticketUrl = 'Must be a valid http(s) URL.'
    }
    if (previewUrl.trim() && !isValidUrl(previewUrl)) {
      errs.previewUrl = 'Must be a valid http(s) URL.'
    }

    const r = Number(rating)
    if (rating !== '' && (isNaN(r) || r < 0 || r > 10)) {
      errs.rating = 'Rating must be between 0 and 10.'
    }

    return errs
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      e.preventDefault()
      setErrors(errs)
      const firstKey = Object.keys(errs)[0]
      const target = e.currentTarget.querySelector(
        `[data-field="${firstKey}"]`,
      ) as HTMLElement | null
      target?.focus()
      return
    }
    setErrors({})
  }

  return (
    <form
      action={formAction}
      onSubmit={onSubmit}
      className={classes.form}
      noValidate
    >
      {mode === 'edit' && defaults?.id && (
        <input type="hidden" name="id" value={defaults.id} />
      )}
      {mode === 'submission' && contactId && (
        <input type="hidden" name="contactId" value={contactId} />
      )}

      {state?.error && <p className={classes.error}>{state.error}</p>}

      <fieldset className={classes.section}>
        <legend>Basics</legend>
        <label className={classes.field}>
          <span>Title</span>
          <input
            data-field="title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              clearError('title')
            }}
            aria-invalid={!!errors.title}
          />
          {errors.title && <span className={classes.fieldError}>{errors.title}</span>}
        </label>
        <label className={classes.field}>
          <span>Genre</span>
          <input
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g. shoegaze, hardcore"
          />
        </label>
        <label className={classes.field}>
          <span>Excerpt</span>
          <textarea
            name="excerpt"
            rows={5}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </label>
      </fieldset>

      <fieldset className={classes.section}>
        <legend>Scheduling</legend>
        <div className={classes.row}>
          <label className={classes.field}>
            <span>Date</span>
            <input
              data-field="date"
              name="date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                clearError('date')
              }}
              aria-invalid={!!errors.date}
            />
            {errors.date && <span className={classes.fieldError}>{errors.date}</span>}
          </label>
          <label className={classes.field}>
            <span>Time</span>
            <input
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 8:00 PM"
            />
          </label>
          <label className={classes.field}>
            <span>Price</span>
            <input
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. $15 or Free"
            />
          </label>
        </div>
        <label className={classes.field}>
          <span>Venue</span>
          <select
            data-field="venueId"
            name="venueId"
            value={venueSelection}
            onChange={(e) => {
              setVenueSelection(e.target.value)
              clearError('venueId')
            }}
            aria-invalid={!!errors.venueId}
          >
            <option value="" disabled>Pick a venue…</option>
            {venues.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
            <option value="__new__">+ Add a new venue…</option>
          </select>
          {errors.venueId && <span className={classes.fieldError}>{errors.venueId}</span>}
        </label>
        {creatingVenue && (
          <label className={classes.field}>
            <span>New venue name</span>
            <input
              data-field="newVenueName"
              name="newVenueName"
              value={newVenueName}
              onChange={(e) => {
                setNewVenueName(e.target.value)
                clearError('newVenueName')
              }}
              placeholder="e.g. Good Room"
              aria-invalid={!!errors.newVenueName}
            />
            {errors.newVenueName && (
              <span className={classes.fieldError}>{errors.newVenueName}</span>
            )}
          </label>
        )}
      </fieldset>

      <fieldset className={classes.section}>
        <legend>Media</legend>
        <label className={classes.field}>
          <span>Image URL</span>
          <input
            name="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value)
              clearError('imageUrl')
              clearError('image')
            }}
            placeholder="https://…"
            aria-invalid={!!errors.imageUrl}
          />
          {errors.imageUrl && <span className={classes.fieldError}>{errors.imageUrl}</span>}
        </label>
        <div
          data-field="image"
          tabIndex={0}
          className={dragging ? classes.dropzoneActive : classes.dropzone}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click()
          }}
          aria-invalid={!!errors.image}
        >
          <span>Drop an image here, or click to pick a file.</span>
          <input
            ref={fileInputRef}
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            hidden
          />
        </div>
        {errors.image && <span className={classes.fieldError}>{errors.image}</span>}
        {previewSrc && (
          <div className={classes.preview}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewSrc} alt="Preview" />
          </div>
        )}
        <label className={classes.field}>
          <span>Ticket URL</span>
          <input
            name="ticketUrl"
            type="url"
            value={ticketUrl}
            onChange={(e) => {
              setTicketUrl(e.target.value)
              clearError('ticketUrl')
            }}
            placeholder="https://…"
            aria-invalid={!!errors.ticketUrl}
          />
          {errors.ticketUrl && (
            <span className={classes.fieldError}>{errors.ticketUrl}</span>
          )}
        </label>
        <div className={classes.row}>
          <label className={classes.field}>
            <span>Preview audio URL</span>
            <input
              name="previewUrl"
              type="url"
              value={previewUrl}
              onChange={(e) => {
                setPreviewUrl(e.target.value)
                clearError('previewUrl')
              }}
              aria-invalid={!!errors.previewUrl}
            />
            {errors.previewUrl && (
              <span className={classes.fieldError}>{errors.previewUrl}</span>
            )}
          </label>
          <label className={classes.field}>
            <span>Preview track name</span>
            <input
              name="previewTrack"
              value={previewTrack}
              onChange={(e) => setPreviewTrack(e.target.value)}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className={classes.section}>
        <legend>Publishing</legend>
        <div className={classes.row}>
          <label className={classes.checkField}>
            <input
              type="checkbox"
              name="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            <span>Featured on home page</span>
          </label>
          <label className={classes.field}>
            <span>Rating (0–10)</span>
            <input
              name="rating"
              type="number"
              min={0}
              max={10}
              value={rating}
              onChange={(e) => {
                setRating(e.target.value)
                clearError('rating')
              }}
              aria-invalid={!!errors.rating}
            />
            {errors.rating && <span className={classes.fieldError}>{errors.rating}</span>}
          </label>
        </div>
      </fieldset>

      <div className={classes.actions}>
        <button type="submit" disabled={pending} className={classes.submit}>
          {pending ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
