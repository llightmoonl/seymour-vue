export { DrawingGridView, DrawingGridEditable } from './modules/DrawingGrid';
export { HebbianGeneration, HebbianTraining, HebbianRecognition, HebbianQuality } from './modules/Hebbian';
export { DeltaGeneration, DeltaTraining, DeltaRecognition, DeltaQuality } from './modules/Delta';
export { NeuronBase, NeuronDelta } from './modules/Neuron';
export { DetailList, DetailBlock } from './modules/DetailList';
export { CreateResearchModal } from './modules/Modals';
export { ProjectsList, ProjectsListItem, ProjectsListSkeleton, ProjectsListSkeletonItem } from './modules/ProjectsList';
export { default as ProjectsPage } from './ui/ProjectsPage.vue';

export { useTabs } from './stores/useTabs';

export { useCompleteTab } from './composables/useCompleteTab';
export { useProgressTabs } from './composables/useProgressTabs';
export { useAllProjects } from './composables/useAllProjects';
