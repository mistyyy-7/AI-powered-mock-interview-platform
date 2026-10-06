import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

class VisualAnalyzer {
  constructor() {
    this.landmarker = null;
    this.isInitializing = false;
    this.metrics = this.getEmptyMetrics();
    this.lastVideoTime = -1;
  }

  getEmptyMetrics() {
    return {
      totalFrames: 0,
      facePresentFrames: 0,
      lookingAwayFrames: 0,
      headMovementScore: 0,
      lastRotation: null,
    };
  }

  async initialize() {
    if (this.landmarker || this.isInitializing) return;
    this.isInitializing = true;
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      this.landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        outputFacialTransformationMatrixes: true,
        runningMode: "VIDEO",
        numFaces: 1
      });
      console.log('Visual Analyzer Initialized');
    } catch (e) {
      console.error("Failed to init FaceLandmarker", e);
    }
    this.isInitializing = false;
  }

  analyzeFrame(videoElement) {
    if (!this.landmarker || !videoElement || videoElement.readyState < 2) return;

    if (videoElement.currentTime === this.lastVideoTime) return;
    this.lastVideoTime = videoElement.currentTime;

    try {
      const results = this.landmarker.detectForVideo(videoElement, performance.now());
      this.metrics.totalFrames++;

      if (results.faceLandmarks && results.faceLandmarks.length > 0) {
        this.metrics.facePresentFrames++;
        
        // Analyze head movement
        if (results.facialTransformationMatrixes && results.facialTransformationMatrixes.length > 0) {
          const matrix = results.facialTransformationMatrixes[0].data;
          if (this.metrics.lastRotation) {
            let diff = 0;
            for(let i=0; i<16; i++) {
              diff += Math.abs(matrix[i] - this.metrics.lastRotation[i]);
            }
            this.metrics.headMovementScore += diff;
          }
          this.metrics.lastRotation = [...matrix];
        }

        // Analyze eye contact / looking away
        if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
          const shapes = results.faceBlendshapes[0].categories;
          const getShape = (name) => shapes.find(s => s.categoryName === name)?.score || 0;
          
          const isLookingAway = (
            getShape('eyeLookInLeft') > 0.4 || 
            getShape('eyeLookOutLeft') > 0.4 || 
            getShape('eyeLookUpLeft') > 0.4 || 
            getShape('eyeLookDownLeft') > 0.4
          );
          
          if (isLookingAway) {
            this.metrics.lookingAwayFrames++;
          }
        }
      }
    } catch (err) {
      // Catch occasional mediapipe async video frame errors
    }
  }

  getMetricsSummary() {
    const total = this.metrics.totalFrames || 1;
    const facePresencePercent = Math.round((this.metrics.facePresentFrames / total) * 100);
    const lookingAwayPercent = Math.round((this.metrics.lookingAwayFrames / total) * 100);
    
    // Average head movement per frame
    const avgMovement = this.metrics.headMovementScore / total;
    let headMovementLevel = 'Stable';
    if (avgMovement > 0.5) headMovementLevel = 'High';
    else if (avgMovement > 0.15) headMovementLevel = 'Moderate';

    const eyeContactPercent = Math.max(0, 100 - lookingAwayPercent);

    return {
      facePresencePercent,
      eyeContactPercent,
      lookingAwayPercent,
      headMovementLevel
    };
  }
  
  resetMetrics() {
    this.metrics = this.getEmptyMetrics();
  }
}

export const visualAnalyzer = new VisualAnalyzer();
