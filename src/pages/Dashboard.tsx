import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePets } from "../hooks/usePets";
import type { CareTip, GroomingTip, Pet } from "../types/pet";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

type PetFormState = Omit<Pet, "id">;
type CareTipFormState = Omit<CareTip, "id">;
type GroomingTipFormState = Omit<GroomingTip, "id">;

const emptyPetForm: PetFormState = {
  title: "",
  breed: "",
  description: "",
  imageUrl: "",
  createdAt: "",
  size: 0,
};

const emptyCareForm: CareTipFormState = {
  title: "",
  category: "",
  description: "",
};

const emptyGroomingForm: GroomingTipFormState = {
  title: "",
  petType: "",
  frequency: "",
  description: "",
};

const inputClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500";

const textAreaClassName =
  "min-h-[110px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500";

export default function Dashboard() {
  const {
    data,
    careTips,
    groomingTips,
    loading,
    error,
    createPet,
    updatePet,
    deletePet,
    createCareTip,
    updateCareTip,
    deleteCareTip,
    createGroomingTip,
    updateGroomingTip,
    deleteGroomingTip,
  } = usePets();

  const [petForm, setPetForm] = useState<PetFormState>(emptyPetForm);
  const [careForm, setCareForm] = useState<CareTipFormState>(emptyCareForm);
  const [groomingForm, setGroomingForm] =
    useState<GroomingTipFormState>(emptyGroomingForm);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);
  const [editingCareId, setEditingCareId] = useState<string | null>(null);
  const [editingGroomingId, setEditingGroomingId] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handlePetChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setPetForm((prev) => ({
      ...prev,
      [name]: name === "size" ? Number(value) : value,
    }));
  };

  const handleCareChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setCareForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGroomingChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setGroomingForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitPet = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingPetId) {
      updatePet(editingPetId, petForm);
    } else {
      createPet(petForm);
    }

    setPetForm(emptyPetForm);
    setEditingPetId(null);
  };

  const submitCareTip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingCareId) {
      updateCareTip(editingCareId, careForm);
    } else {
      createCareTip(careForm);
    }

    setCareForm(emptyCareForm);
    setEditingCareId(null);
  };

  const submitGroomingTip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingGroomingId) {
      updateGroomingTip(editingGroomingId, groomingForm);
    } else {
      createGroomingTip(groomingForm);
    }

    setGroomingForm(emptyGroomingForm);
    setEditingGroomingId(null);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="mx-auto mt-24 flex max-w-7xl flex-col gap-8 p-4 pb-12"
    >
      <section className="rounded-3xl bg-slate-900/90 p-8 text-white shadow-2xl backdrop-blur-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-200">
          Dashboard
        </p>
        <h1 className="mt-3 text-4xl font-semibold">
          Pet care, grooming, and content management
        </h1>
        <p className="mt-4 max-w-3xl text-slate-200">
          Use this dashboard to manage pet profiles, publish care guidance, and
          keep grooming recommendations current. All CRUD actions persist in
          your browser using localStorage.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatsCard label="Pets" value={data.length} helper="Profiles in gallery" />
        <StatsCard
          label="Care Tips"
          value={careTips.length}
          helper="Visitor-facing care guidance"
        />
        <StatsCard
          label="Grooming Tips"
          value={groomingTips.length}
          helper="Maintenance and hygiene content"
        />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 rounded-2xl bg-white/90 p-6 shadow-xl">
          <SectionHeader
            title="Pet care section"
            description="Helpful visitor-facing care guidance shown inside the dashboard."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {careTips.map((tip) => (
              <article
                key={tip.id}
                className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {tip.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  {tip.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {tip.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl bg-white/90 p-6 shadow-xl">
          <SectionHeader
            title="Grooming section"
            description="Visitor-facing grooming recommendations for dogs and cats."
          />
          <div className="space-y-4">
            {groomingTips.map((tip) => (
              <article
                key={tip.id}
                className="rounded-2xl border border-amber-100 bg-amber-50 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {tip.title}
                  </h3>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-amber-700 shadow-sm">
                    {tip.petType}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  Frequency: {tip.frequency}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {tip.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-3">
        <CrudPanel
          title="Pet management"
          description="Create, edit, and delete pet cards shown in the gallery."
        >
          <form className="space-y-3" onSubmit={submitPet}>
            <input
              name="title"
              value={petForm.title}
              onChange={handlePetChange}
              placeholder="Pet type"
              className={inputClassName}
              required
            />
            <input
              name="breed"
              value={petForm.breed}
              onChange={handlePetChange}
              placeholder="Breed"
              className={inputClassName}
              required
            />
            <input
              name="imageUrl"
              value={petForm.imageUrl}
              onChange={handlePetChange}
              placeholder="Image URL"
              className={inputClassName}
              required
            />
            <input
              name="createdAt"
              value={petForm.createdAt}
              onChange={handlePetChange}
              placeholder="Created date"
              type="date"
              className={inputClassName}
              required
            />
            <input
              name="size"
              value={petForm.size ?? 0}
              onChange={handlePetChange}
              placeholder="Card size"
              type="number"
              className={inputClassName}
            />
            <textarea
              name="description"
              value={petForm.description}
              onChange={handlePetChange}
              placeholder="Description"
              className={textAreaClassName}
              required
            />
            <FormActions
              isEditing={Boolean(editingPetId)}
              onCancel={() => {
                setEditingPetId(null);
                setPetForm(emptyPetForm);
              }}
            />
          </form>

          <div className="space-y-3">
            {data.map((pet) => (
              <ManagementCard
                key={pet.id}
                title={`${pet.title} - ${pet.breed}`}
                subtitle={pet.createdAt}
                description={pet.description}
                onEdit={() => {
                  setEditingPetId(pet.id);
                  setPetForm({
                    title: pet.title,
                    breed: pet.breed,
                    description: pet.description,
                    imageUrl: pet.imageUrl,
                    createdAt: pet.createdAt,
                    size: pet.size ?? 0,
                  });
                }}
                onDelete={() => deletePet(pet.id)}
              />
            ))}
          </div>
        </CrudPanel>

        <CrudPanel
          title="Care content CRUD"
          description="Manage the pet care guidance displayed above."
        >
          <form className="space-y-3" onSubmit={submitCareTip}>
            <input
              name="title"
              value={careForm.title}
              onChange={handleCareChange}
              placeholder="Care tip title"
              className={inputClassName}
              required
            />
            <input
              name="category"
              value={careForm.category}
              onChange={handleCareChange}
              placeholder="Category"
              className={inputClassName}
              required
            />
            <textarea
              name="description"
              value={careForm.description}
              onChange={handleCareChange}
              placeholder="Description"
              className={textAreaClassName}
              required
            />
            <FormActions
              isEditing={Boolean(editingCareId)}
              onCancel={() => {
                setEditingCareId(null);
                setCareForm(emptyCareForm);
              }}
            />
          </form>

          <div className="space-y-3">
            {careTips.map((tip) => (
              <ManagementCard
                key={tip.id}
                title={tip.title}
                subtitle={tip.category}
                description={tip.description}
                onEdit={() => {
                  setEditingCareId(tip.id);
                  setCareForm({
                    title: tip.title,
                    category: tip.category,
                    description: tip.description,
                  });
                }}
                onDelete={() => deleteCareTip(tip.id)}
              />
            ))}
          </div>
        </CrudPanel>

        <CrudPanel
          title="Grooming content CRUD"
          description="Manage grooming guidance shown to visitors."
        >
          <form className="space-y-3" onSubmit={submitGroomingTip}>
            <input
              name="title"
              value={groomingForm.title}
              onChange={handleGroomingChange}
              placeholder="Grooming tip title"
              className={inputClassName}
              required
            />
            <input
              name="petType"
              value={groomingForm.petType}
              onChange={handleGroomingChange}
              placeholder="Pet type"
              className={inputClassName}
              required
            />
            <input
              name="frequency"
              value={groomingForm.frequency}
              onChange={handleGroomingChange}
              placeholder="Recommended frequency"
              className={inputClassName}
              required
            />
            <textarea
              name="description"
              value={groomingForm.description}
              onChange={handleGroomingChange}
              placeholder="Description"
              className={textAreaClassName}
              required
            />
            <FormActions
              isEditing={Boolean(editingGroomingId)}
              onCancel={() => {
                setEditingGroomingId(null);
                setGroomingForm(emptyGroomingForm);
              }}
            />
          </form>

          <div className="space-y-3">
            {groomingTips.map((tip) => (
              <ManagementCard
                key={tip.id}
                title={tip.title}
                subtitle={`${tip.petType} - ${tip.frequency}`}
                description={tip.description}
                onEdit={() => {
                  setEditingGroomingId(tip.id);
                  setGroomingForm({
                    title: tip.title,
                    petType: tip.petType,
                    frequency: tip.frequency,
                    description: tip.description,
                  });
                }}
                onDelete={() => deleteGroomingTip(tip.id)}
              />
            ))}
          </div>
        </CrudPanel>
      </section>
    </motion.div>
  );
}

function StatsCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: number;
  helper: string;
}) {
  return (
    <div className="rounded-2xl bg-white/90 p-5 shadow-lg">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-3 text-4xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{helper}</p>
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}

function CrudPanel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5 rounded-2xl bg-white/90 p-6 shadow-xl">
      <SectionHeader title={title} description={description} />
      {children}
    </section>
  );
}

function FormActions({
  isEditing,
  onCancel,
}: {
  isEditing: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="flex gap-3">
      <button
        type="submit"
        className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white"
      >
        {isEditing ? "Update" : "Create"}
      </button>
      {isEditing ? (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Cancel
        </button>
      ) : null}
    </div>
  );
}

function ManagementCard({
  title,
  subtitle,
  description,
  onEdit,
  onDelete,
}: {
  title: string;
  subtitle: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
            {subtitle}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-white"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-md bg-rose-500 px-3 py-1.5 text-xs font-medium text-white"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
    </article>
  );
}
