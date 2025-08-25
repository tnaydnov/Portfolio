'use client';

import type { Project } from '@/data/projects';
import Image from 'next/image';
import { useState, useRef } from 'react';

export default function ProjectCard({ project }: { project: Project }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (project.video && videoRef.current && isVideoLoaded) {
      setIsVideoPlaying(true);
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (project.video && videoRef.current) {
      setIsVideoPlaying(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const openVideoModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  };

  const handleGitHubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.repo, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <article 
        className="glass-card overflow-hidden hover:scale-[1.02] group transition-all duration-500 relative cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/0 to-purple-500/0 group-hover:from-[var(--accent-primary)]/10 group-hover:to-purple-500/10 transition-all duration-500 rounded-2xl"></div>
        
        {/* Media Section */}
        <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          {/* Video */}
          {project.video && (
            <video
              ref={videoRef}
              src={project.video}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isVideoPlaying ? 'opacity-100' : 'opacity-0'
              }`}
              muted
              loop
              playsInline
              onLoadedData={handleVideoLoad}
              preload="metadata"
            />
          )}
          
          {/* Image (fallback or when video not playing) */}
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className={`object-cover group-hover:scale-105 transition-all duration-500 ${
                isVideoPlaying ? 'opacity-0' : 'opacity-100'
              }`}
            />
          ) : (
            // Fallback tech-inspired pattern
            <div className={`absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 transition-opacity duration-500 ${
              isVideoPlaying ? 'opacity-0' : 'opacity-100'
            }`}>
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-[length:20px_20px] bg-[position:0_0,10px_10px] bg-repeat" style={{
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(45, 212, 191, 0.3) 1px, transparent 1px),
                    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                  `
                }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent-primary)] to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          
          {/* Play button overlay for videos */}
          {project.video && !isVideoPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 border border-white/20 group-hover:bg-black/70 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}
          
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-gradient-to-r from-[var(--accent-primary)] to-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
                Featured
              </span>
            </div>
          )}
          
          {/* Year badge */}
          {project.year && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                {project.year}
              </span>
            </div>
          )}
          
          {/* Video indicator */}
          {project.video && (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="bg-red-500/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Demo
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 relative z-10">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-lg font-semibold leading-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              {project.title}
            </h3>
          </div>
          
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 4).map((tech, index) => (
              <span 
                key={tech} 
                className="text-xs rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-2 py-1 text-[var(--text-secondary)] group-hover:border-[var(--accent-primary)]/30 transition-colors"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-2 py-1 text-[var(--text-secondary)] opacity-60">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.video && (
              <button
                onClick={openVideoModal}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Demo
              </button>
            )}
            <button
              onClick={handleGitHubClick}
              className={`${project.video ? 'flex-1' : 'w-full'} bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.09-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 7.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.175 22 16.427 22 12.012 22 6.484 17.523 2 12 2z"/>
              </svg>
              {project.video ? 'Code' : 'View Code'}
            </button>
          </div>
        </div>

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </article>

      {/* Video Modal */}
      {showVideoModal && project.video && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeVideoModal}>
          <div className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 to-gray-900">
              <h3 className="text-lg font-semibold text-white">{project.title} - Demo</h3>
              <button
                onClick={closeVideoModal}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Video Player */}
            <div className="relative bg-black">
              <video
                ref={modalVideoRef}
                src={project.video}
                className="w-full h-auto max-h-[70vh] object-contain"
                controls
                autoPlay
                playsInline
              />
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 6).map((tech) => (
                  <span 
                    key={tech} 
                    className="text-xs rounded-full bg-white/10 px-2 py-1 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.09-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 7.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.175 22 16.427 22 12.012 22 6.484 17.523 2 12 2z"/>
                </svg>
                View Code
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
