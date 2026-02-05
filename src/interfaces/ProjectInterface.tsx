export default interface ProjectInterface {
    title: string;
    description: string;
    project: string;
    moreDetails: string[];
    Technologies: string[];
    Images: string[];
    onSelect?: () => void;
}