export default interface ProjectInterface {
    title: string;
    description: string;
    project: string;
    moreDetails: string[];
    technologies: string[];
    images: string[];
    onSelect?: () => void;
    github?: string;
}